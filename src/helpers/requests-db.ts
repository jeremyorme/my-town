import { DirectoryDb } from './directory-db';

export interface Request {
  _id: string;
  idx: number;
}

export class RequestsDb
{
  _directoryDb: DirectoryDb;
  _db: any;
  _onChangeFns: any[] = [];

  constructor(directoryDb: DirectoryDb) {
    this._directoryDb = directoryDb;
  }

  async _notifyChange() {
    for (const changeFn of this._onChangeFns)
      await changeFn();
  }

  onChange(fn: any) {
    this._onChangeFns.push(fn);
  }

  init() {
    this._directoryDb.onChange(async () => {
      await this._directoryDb.load();
      this._db = await this._directoryDb.publicLog('requests');
      this._db.events.on('replicated', () => {
        this._notifyChange();
      });
      this._db.events.on('write', () => {
        this._notifyChange();
      });
      await this.load();
      return this._notifyChange();
    });
  }

  load() {
    if (this._db)
      return this._db.load();
  }

  top(limit: number = -1): Array<Request> {
    return this._db.iterator({ limit: limit, reverse: true })
      .collect()
      .map(e => e.payload.value as Request);
  }

  push(request: Request) {
    return this._db.add(request);
  }
}