import { MainDb } from './main-db';

export interface Business {
  _id: number;
  name: string;
  description: string;
  url: string;
  tel: string;
  address: string;
  longitude: number;
  latitude: number;
  icon: string;
}

export class BusinessDb {
  _mainDb: any;
  _db: any;
  _onChangeFns: any[] = [];

  constructor (mainDb: MainDb) {
    this._mainDb = mainDb;
  }

  async init(businessId: string) {  
    this._db = await this._mainDb.docstore(businessId && businessId != 'self' ? ('/orbitdb/' + businessId + '/business') : 'business');
    await this.load();
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

  put(business: Business) {
    return this._db.put(business);
  }

  get(id: number) {
    return this._db.query(b => b._id == id)[0];
  }

  all() {
    return this._db.query(_ => true);
  }

  nextIndex() {
    const allBusinesses = this.all();
    if (allBusinesses.length == 0)
      return 1;
    const lastBusiness = allBusinesses.reduce((prev, current) => (prev._id > current._id) ? prev : current);
    return lastBusiness._id + 1;
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
