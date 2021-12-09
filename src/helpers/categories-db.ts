import { DirectoryDb } from './directory-db';

export interface Category {
  _id: string;
  headline: string;
}

export class CategoriesDb {
  _directoryDb: DirectoryDb;
  _db: any;
  _onChangeFn: any;

  constructor(directoryDb: DirectoryDb) {
    this._directoryDb = directoryDb;
  }

  init() {
    this._directoryDb.onChange(async () => {
      await this._directoryDb.load();
      this._db = await this._directoryDb.docstore('categories');
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

  async get(id: string): Promise<Category> {
    if (!this._db)
      return null;
    const category = await this._db.query(b => b._id == id);
    return category.length > 0 ? category[0] as Category : null;
  }

  put(category: Category) {
    return this._db.put(category);
  }

  canWrite(dbName: string = null) {
    return dbName ? this._directoryDb.canWrite(dbName) : this._directoryDb.canWrite(this._db);
  }
}