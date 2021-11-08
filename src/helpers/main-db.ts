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
            '/dns6/star.thedisco.zone/tcp/9090/wss/p2p-webrtc-star'
          ]
        }
      },
      relay: { enabled: true, hop: { enabled: true, active: true } }
    };
    this.ipfs = await IPFS.create(ipfsOptions);
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