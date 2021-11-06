import { MainDb } from './main-db';

export class BusinessDb {
  db: any;

  async init(mainDb: MainDb) {
    const name = 'business';
    const dbs = mainDb.db.get(name);
    if (dbs) {
      // If we already have a business DB then use it
      this.db = await mainDb.orbitdb.docstore(dbs);
    }
    else {
      // Otherwise create a new one and store its address
      this.db = await mainDb.orbitdb.docstore(name);
      if (mainDb.canWrite())
        mainDb.db.put(name, this.db.address.toString());
    }
    await this.db.load();
  }

  dbAddress(): string { 
    return this.db.address.toString();
  }

  identity(): string {
    return JSON.stringify(this.db.identity.toJSON());
  }
}