import { BusinessDb } from './business-db';
import { CategoryDb } from './category-db';
import { DownloadableKeystore } from './downloadable-keystore';

export class MainDb {
  _ipfs: any;
  _orbitdb: any;
  _db: any;
  _onChangeFns: any[] = [];
  _keystore: any;

  id: string;

  businessDb: BusinessDb = new BusinessDb();
  categoryDb: CategoryDb = new CategoryDb();

  async init(Ipfs: any, OrbitDB: any, id: string, dbName: string) {

    this.id = id;

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

    if (!this.id) {
      const ipfsId = await this._ipfs.id();
      this.id = ipfsId.id;
    }

    this._keystore = new DownloadableKeystore();
    this._orbitdb = await OrbitDB.createInstance(this._ipfs, {keystore: this._keystore, id: this.id});
    this._db = await this._orbitdb.keyvalue(dbName && dbName.length > 0 ? dbName : 'my-town');
    this.businessDb.init(this);
    this.categoryDb.init(this);
    await this._db.load();
    this._notifyChange();
    this._db.events.on('replicated', () => { return this._notifyChange() });
  }

  async backupIdentity(passPhrase: string) {
    return this._keystore.getKeyData(this.id, passPhrase);
  }

  restoreIdentity(keyData: string, passPhrase: string) {
    return this._keystore.setKeyData(keyData, passPhrase);
  }

  load() {
    if (this._db)
      return this._db.load();
  }

  async _notifyChange() {
    for (const changeFn of this._onChangeFns)
      await changeFn();
  }

  onChange(fn: any) {
    this._onChangeFns.push(fn);
  }

  async get(dbName: string): Promise<any> {
    const dbAddress = this._db.get(dbName);
    if (dbAddress) {
      return this._orbitdb.docstore(dbAddress);
    }

    const db = await this._orbitdb.docstore(dbName);
    if (this.canWrite())
      this._db.put(dbName, db.address.toString());
    return db;
  }

  address() {
    return this._db.address.toString();
  }

  canWrite() {
    if (!this._db)
      return false;
    const access = new Set(this._db.access.write)
    return access.has(this._orbitdb.identity.id) || access.has("*")
  }
}