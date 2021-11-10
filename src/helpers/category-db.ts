import { MainDb } from './main-db';

export class CategoryDb {
  db: any;
  onChangeFn: any;

  async init(mainDb: MainDb) {
    const name = 'category';
    const dbs = mainDb.db.get(name);
    if (dbs) {
      // If we already have a category DB then use it
      this.db = await mainDb.orbitdb.docstore(dbs);
    }
    else {
      // Otherwise create a new one and store its address
      this.db = await mainDb.orbitdb.docstore(name);
      if (mainDb.canWrite())
        mainDb.db.put(name, this.db.address.toString());
    }
    this.db.events.on('replicated', () => {
      if (this.onChangeFn)
        return this.onChangeFn();
    });
    this.db.events.on('write', () => {
      if (this.onChangeFn)
        return this.onChangeFn();
    });
  }

  async load() {
    return this.db.load();
  }

  onChange(fn: any) {
    this.onChangeFn = fn;
  }

  async query(category: string) {
    return this.db.query(b => b._id == category);
  }

  dbAddress(): string { 
    return this.db.address.toString();
  }

  identity(): string {
    return JSON.stringify(this.db.identity.toJSON());
  }
}