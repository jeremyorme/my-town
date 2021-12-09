const homeDirectoryIdKey = 'my-town-home-directory-id';

export class LocalStorageDb
{
  _onChangeFns: any[] = [];

  async _notifyChange() {
    for (const changeFn of this._onChangeFns)
      await changeFn();
  }

  onChange(fn: any) {
    this._onChangeFns.push(fn);
  }

  setHomeDirectoryId(directoryId: string) {
    localStorage.setItem(homeDirectoryIdKey, directoryId);
    return this._notifyChange();
  }

  getHomeDirectoryId(): string {
    return localStorage.getItem(homeDirectoryIdKey);
  }
}