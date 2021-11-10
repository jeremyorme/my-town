import { MainDb } from './main-db';

export interface Category {
  _id: string;
  headline: string;
}

export class CategoryDb {
  _db: any;
  _onChangeFn: any;

  async init(mainDb: MainDb) {
    this._db = await mainDb.get('category');
    this._db.events.on('replicated', () => {
      if (this._onChangeFn)
        return this._onChangeFn();
    });
    this._db.events.on('write', () => {
      if (this._onChangeFn)
        return this._onChangeFn();
    });
  }

  load() {
    return this._db.load();
  }

  onChange(fn: any) {
    this._onChangeFn = fn;
  }

  async get(id: string): Promise<Category> {
    const category = await this._db.query(b => b._id == id);
    return category.length > 0 ? category[0] as Category : null;
  }

  put(category: Category) {
    return this._db.put(category);
  }
}