import { MainDb } from './main-db';
import { BusinessesDb } from './businesses-db';
import { CategoriesDb } from './categories-db';
import { RequestsDb } from './requests-db';
import { DirectoryFieldsDb } from './directory-fields-db';

export class DirectoryDb {
  _mainDb: any;
  _db: any;
  _onChangeFns: any[] = [];

  businesses: BusinessesDb = new BusinessesDb(this);
  categories: CategoriesDb = new CategoriesDb(this);
  requests: RequestsDb = new RequestsDb(this);
  directoryFields: DirectoryFieldsDb = new DirectoryFieldsDb(this);

  constructor (mainDb: MainDb) {
    this._mainDb = mainDb;
  }

  async init(directoryId: string) {  
    this._db = await this._mainDb.keyvalue(directoryId && directoryId != 'self' ? ('/orbitdb/' + directoryId + '/directory') : 'directory');
    this.businesses.init();
    this.categories.init();
    this.requests.init();
    this.directoryFields.init();
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

  async keyvalue(dbName: string): Promise<any> {
    const dbAddress = this._db.get(dbName);
    if (dbAddress) {
      return this._mainDb.keyvalue(dbAddress);
    }

    const db = await this._mainDb.keyvalue(dbName);
    if (this.canWrite())
      this._db.put(dbName, db.address.toString());
    return db;
  }

  async docstore(dbName: string): Promise<any> {
    const dbAddress = this._db.get(dbName);
    if (dbAddress) {
      return this._mainDb.docstore(dbAddress);
    }

    const db = await this._mainDb.docstore(dbName);
    if (this.canWrite())
      this._db.put(dbName, db.address.toString());
    return db;
  }

  async publicLog(dbName: string): Promise<any> {
    const dbAddress = this._db.get(dbName);
    if (dbAddress) {
      return this._mainDb.log(dbAddress, {accessController: {write: ['*']}});
    }

    const db = await this._mainDb.log(dbName);
    if (this.canWrite())
      this._db.put(dbName, db.address.toString());
    return db;
  }

  address() {
    return this._db && this._db.address ? this._db.address.toString() : '';
  }

  id() {
    return this.address().split('/')[2];
  }

  canWrite(dbName: string = null) {
    return dbName ? this._mainDb.canWrite(dbName) : this._mainDb.canWrite(this._db);
  }
}