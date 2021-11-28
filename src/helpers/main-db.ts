import { DownloadableKeystore } from './downloadable-keystore';
import { DirectoryDb } from './directory-db';

export class MainDb {
  Ipfs: any;
  OrbitDB: any;

  _ipfs: any;
  _orbitdb: any;
  _keystore: any;
  _ipfsId: string;
  _needInit: boolean = true;

  _directories: Map<string, DirectoryDb> = new Map();

  constructor(Ipfs: any, OrbitDB: any, ipfsId: string) {
    this.Ipfs = Ipfs;
    this.OrbitDB = OrbitDB;
    this._ipfsId = ipfsId;
  }

  async init() {

    if (!this._needInit)
      return;

    this._needInit = false;

    this._ipfs = await this.Ipfs.create({
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

    if (!this._ipfsId) {
      const ipfsIdObj = await this._ipfs.id();
      this._ipfsId = ipfsIdObj.id;
    }

    this._keystore = new DownloadableKeystore();
    this._orbitdb = await this.OrbitDB.createInstance(this._ipfs, {keystore: this._keystore, id: this._ipfsId});
  }

  async backupIdentity(passPhrase: string) {
    return this._keystore.getKeyData(this._ipfsId, passPhrase);
  }

  restoreIdentity(keyData: string, passPhrase: string) {
    return this._keystore.setKeyData(keyData, passPhrase);
  }

  async directory(directoryId: string) {
    if (this._directories.has(directoryId))
      return this._directories.get(directoryId);

    await this.init();
    const d = new DirectoryDb(this);
    await d.init(directoryId);
    return d;
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