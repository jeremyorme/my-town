import { DownloadableKeystore } from './downloadable-keystore';
import { DirectoryDb } from './directory-db';

export class MainDb {
  _ipfs: any;
  _orbitdb: any;
  _keystore: any;

  _ipfsId: string;

  directoryDb: DirectoryDb = new DirectoryDb(this);

  async init(Ipfs: any, OrbitDB: any, ipfsId: string, dbName: string) {

    this._ipfs = await Ipfs.create({
      repo : './ipfs',
      start: true,
      preload: { 
        enabled: false
      },
      EXPERIMENTAL: {
        pubsub: true,
      },
      config: {
        Addresses: {
          Swarm: [
            '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
            '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
            '/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/',
          ]
        },
      }
    })

    this._ipfsId = ipfsId;
    if (!this._ipfsId) {
      const ipfsIdObj = await this._ipfs.id();
      this._ipfsId = ipfsIdObj.id;
    }

    this._keystore = new DownloadableKeystore();
    this._orbitdb = await OrbitDB.createInstance(this._ipfs, {keystore: this._keystore, id: this._ipfsId});
    await this.directoryDb.init(dbName);
  }

  async backupIdentity(passPhrase: string) {
    return this._keystore.getKeyData(this._ipfsId, passPhrase);
  }

  restoreIdentity(keyData: string, passPhrase: string) {
    return this._keystore.setKeyData(keyData, passPhrase);
  }

  keyvalue(dbName: string) {
    return this._orbitdb.keyvalue(dbName);
  }

  docstore(dbName: string) {
    return this._orbitdb.docstore(dbName);
  }

  canWrite(db: any) {
    if (!db)
      return false;
    const access = new Set(db.access.write);
    return access.has(this._orbitdb.identity.id) || access.has("*");
  }
}