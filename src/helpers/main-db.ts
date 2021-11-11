import { BusinessDb } from './business-db';
import { CategoryDb } from './category-db';

export class MainDb {
  _ipfs: any;
  _orbitdb: any;
  _dbName: string;
  _db: any;

  businessDb: BusinessDb = new BusinessDb();
  categoryDb: CategoryDb = new CategoryDb();

  constructor(dbName: string) {
    this._dbName = dbName;
  }

  async init(Ipfs: any, OrbitDB: any) {

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

    this._orbitdb = await OrbitDB.createInstance(this._ipfs);
    this._db = await this._orbitdb.keyvalue(this.isTemporary() ? 'my-town' : this._dbName);
    await this._db.load();
    await this._initChildren();
    this._db.events.on('replicated', () => {
      return this._initChildren();
    });
  }

  async _initChildren() {
    await this.businessDb.init(this);
    await this.categoryDb.init(this);
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

  isTemporary(): boolean {
    return !this._dbName || this._dbName.length == 0;
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