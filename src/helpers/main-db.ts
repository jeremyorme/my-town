import { BusinessDb } from './business-db';

export class MainDb {
  dbName: string;
  ipfs: any;
  orbitdb: any;
  db: any;

  businessDb: BusinessDb = new BusinessDb();

  constructor(dbName: string) {
    this.dbName = dbName;
  }

  async init(IPFS: any, OrbitDB: any) {
    const ipfsOptions = {
      repo : './ipfs',
      config: {
        Addresses: {
          Swarm: [
            '/dns4/star.thedisco.zone/tcp/9090/wss/p2p-webrtc-star',
            '/dns6/star.thedisco.zone/tcp/9090/wss/p2p-webrtc-star',
            '/dns6/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt',
            '/dns4/ipfs.thedisco.zone/tcp/4430/wss/p2p/12D3KooWChhhfGdB9GJy1GbhghAAKCUR99oCymMEVS4eUcEy67nt'
          ]
        }
      },
      relay: { enabled: true, hop: { enabled: true, active: true } }
    };
    this.ipfs = await IPFS.create(ipfsOptions);

    // process announcements over the relay network, and publish our own
    // keep-alives to keep the channel alive
    await this.ipfs.pubsub.subscribe("announce-circuit", async (addr) => {
        // get our peerid
        let me = await this.ipfs.id();
        me = me.id;

        // not really an announcement if it's from us
        if (addr.from == me) {
            return;
        }

        // if we got a keep-alive, nothing to do
        if (addr == "keep-alive") {
            console.log(addr);
            return;
        }

        let peer = addr.split("/")[9];
        console.log("Peer: " + peer);
        console.log("Me: " + me);
        if (peer == me) { // return if the peer being announced is us
            return;
        }

        // get a list of peers
        let peers = await this.ipfs.swarm.peers();
        for (const i in peers) {
            // if we're already connected to the peer, don't bother doing a
            // circuit connection
            if (peers[i].peer == peer) {
                return;
            }
        }
        // log the address to console as we're about to attempt a connection
        console.log(addr);

        // connection almost always fails the first time, but almost always
        // succeeds the second time, so we do this:
        try {
            await this.ipfs.swarm.connect(addr);
        } catch(err) {
            console.log(err);
            await this.ipfs.swarm.connect(addr);
        }
    });
    setInterval(() => {this.ipfs.pubsub.publish("announce-circuit", "peer-alive");}, 15000);

    this.orbitdb = await OrbitDB.createInstance(this.ipfs);
    this.db = await this.orbitdb.keyvalue(this.isTemporary() ? 'my-town' : this.dbName);
    await this.db.load();

    return this.businessDb.init(this);
  }

  isTemporary(): boolean {
    return !this.dbName || this.dbName.length == 0;
  }

  address() {
    return this.db.address.toString();
  }

  canWrite() {
    const access = new Set(this.db.access.write)
    return access.has(this.orbitdb.identity.id) || access.has("*")
  }
}