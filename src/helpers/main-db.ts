import { BusinessDb } from './business-db';
import { CategoryDb } from './category-db';

export class MainDb {
  dbName: string;
  ipfs: any;
  orbitdb: any;
  db: any;

  businessDb: BusinessDb = new BusinessDb();
  categoryDb: CategoryDb = new CategoryDb();

  constructor(dbName: string) {
    this.dbName = dbName;
  }

  async init(Ipfs: any, OrbitDB: any) {

    this.ipfs = await Ipfs.create({
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

    this.orbitdb = await OrbitDB.createInstance(this.ipfs);
    this.db = await this.orbitdb.keyvalue(this.isTemporary() ? 'my-town' : this.dbName);
    await this.db.load();

    await this.businessDb.init(this);
    await this.categoryDb.init(this);
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