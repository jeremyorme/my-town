import { MainDb } from './main-db';

export class CategoryDb {
  db: any;

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
  }

  async load() {
    return this.db.load();
  }

  onChange(callback: any) {
    this.db.events.on('replicated', () => {
      return callback();
    });
    this.db.events.on('write', () => {
      return callback();
    });
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