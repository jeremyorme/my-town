import { MainDb } from './main-db';
import { BusinessDb } from './business-db';
import { CategoryDb } from './category-db';

export class DirectoryDb {
  _mainDb: any;
  _db: any;
  _onChangeFns: any[] = [];

  businesses: BusinessDb = new BusinessDb(this);
  categories: CategoryDb = new CategoryDb(this);

  constructor (mainDb: MainDb) {
    this._mainDb = mainDb;
  }

  async init(dbName: string) {  
    this._db = await this._mainDb.keyvalue(dbName && dbName.length > 0 ? dbName : 'my-town');
    this.businesses.init();
    this.categories.init();
    await this._db.load();
    await this._notifyChange();
    this._db.events.on('replicated', () => { return this._notifyChange() });
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
      return this._mainDb.docstore(dbAddress);
    }

    const db = await this._mainDb.docstore(dbName);
    if (this.canWrite())
      this._db.put(dbName, db.address.toString());
    return db;
  }

  address() {
    return this._db && this._db.address ? this._db.address.toString() : '';
  }

  canWrite(dbName: string = null) {
    return dbName ? this._mainDb.canWrite(dbName) : this._mainDb.canWrite(this._db);
  }
}