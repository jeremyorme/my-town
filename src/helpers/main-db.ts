import { BusinessDb } from './business-db';

export class MainDb {
  static DEFAULT_DB_NAME: string = 'my-town';

  dbName: string;
  isTemporary: boolean;
  ipfs: any;
  orbitdb: any;
  db: any;

  businessDb: BusinessDb = new BusinessDb();

  constructor(dbName: string) {
    this.isTemporary = !dbName || dbName.length == 0;
    this.dbName = this.isTemporary ? dbName : MainDb.DEFAULT_DB_NAME;
  }

  async init(IPFS: any, OrbitDB: any) {
    const ipfsOptions = {
      repo : './ipfs',
    };
    this.ipfs = await IPFS.create(ipfsOptions);
    this.orbitdb = await OrbitDB.createInstance(this.ipfs);
    this.db = await this.orbitdb.keyvalue(this.dbName);
    await this.db.load();

    return this.businessDb.init(this);
  }

  address() {
    return this.db.address.toString();
  }
}