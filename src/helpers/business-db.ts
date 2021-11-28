import { DirectoryDb } from './directory-db';

export interface Business {
  _id: string;
  category: string;
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
  _directoryDb: DirectoryDb;
  _db: any;
  _onChangeFn: any;

  constructor(directoryDb: DirectoryDb) {
    this._directoryDb = directoryDb;
  }

  init() {
    this._directoryDb.onChange(async () => {
      await this._directoryDb.load();
      this._db = await this._directoryDb.get('business');
      this._db.events.on('replicated', () => {
        if (this._onChangeFn)
          return this._onChangeFn();
      });
      this._db.events.on('write', () => {
        if (this._onChangeFn)
          return this._onChangeFn();
      });
      await this.load();
      if (this._onChangeFn)
        return this._onChangeFn();
    });
  }

  load() {
    if (this._db)
      return this._db.load();
  }

  onChange(fn: any) {
    this._onChangeFn = fn;
  }

  async query(category: string): Promise<Business[]> {
    if (!this._db)
      return null;
    const businesses = this._db.query(b => b.category == category);
    return businesses as Business[];
  }

  async get(id: string): Promise<Business> {
    if (!this._db)
      return null;
    const businesses = await this._db.query(b => b._id == id);
    return businesses.length > 0 ? businesses[0] as Business : null;
  }

  put(business: Business) {
    return this._db.put(business);
  }

  del(id: string) {
    return this._db.del(id);
  }

  canWrite(dbName: string = null) {
    return dbName ? this._directoryDb.canWrite(dbName) : this._directoryDb.canWrite(this._db);
  }
}