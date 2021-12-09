import { DirectoryDb } from './directory-db';

export class DirectoryFieldsDb {
  _directoryDb: DirectoryDb;
  _db: any;
  _onChangeFns: any[] = [];

  constructor (directoryDb: DirectoryDb) {
    this._directoryDb = directoryDb;
  }

  init() {
    this._directoryDb.onChange(async () => {
      await this._directoryDb.load();
      this._db = await this._directoryDb.keyvalue('dir-fields');
      this._db.events.on('replicated', () => {
        return this._notifyChange();
      });
      this._db.events.on('write', () => {
        return this._notifyChange();
      });
      await this.load();
      return this._notifyChange();
    });
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

  getTownName() {
    return this._db.get('town-name') || 'Town Name';
  }

  setTownName(townName: string) {
    return this._db.set('town-name', townName);
  }

  getHeadline() {
    return this._db.get('headline') || 'Shop local. Help *Town Name* thrive!';
  }

  setHeadline(headline: string) {
    return this._db.set('headline', headline);
  }

  getIntroText() {
    return this._db.get('intro-text') || 'The high-street is the beating heart of our local community and vibrant small business underpins our freedom and democracy.\n\n*Support our local businesses* for a stronger community and brighter future.';
  }

  setIntroText(headline: string) {
    return this._db.set('intro-text', headline);
  }

  canWrite(dbName: string = null) {
    return dbName ? this._directoryDb.canWrite(dbName) : this._directoryDb.canWrite(this._db);
  }
}