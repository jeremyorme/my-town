import * as CryptoJS from 'crypto-js';

const Keystore = (window as any).OrbitDB.Keystore;

export class DownloadableKeystore {
  _keystore: any;

  constructor(input: any = {}) {
    this._keystore = new Keystore(input);
  }

  async open() {
    return this._keystore.open();
  }

  async close() {
    return this._keystore.close();
  }

  async hasKey(id) {
    return this._keystore.hasKey(id);
  }

  async createKey(id, { entropy = null } = {}) {
    return this._keystore.createKey(id, { entropy });
  }

  async getKey(id) {
    return this._keystore.getKey(id);
  }

  async sign(key, data) {
    return this._keystore.sign(key, data);
  }

  getPublic(keys, options = {}) {
    return this._keystore.getPublic(keys, options);
  }

  async verify(signature, publicKey, data, v = 'v1') {
    return DownloadableKeystore.verify(signature, publicKey, data, v);
  }

  static async verify (signature, publicKey, data, v = 'v1') {
    return Keystore.verify(signature, publicKey, data, v);
  }

  async getKeyData(id, passPhrase) {
    const cachedKey = this._keystore._cache.get(id);
    let storedKey = null;
    try {
      storedKey = cachedKey || await this._keystore._store.get(id);
    } catch (e) {
      // ignore ENOENT error
    }
    if (!storedKey)
      return;

    const deserializedKey = cachedKey || JSON.parse(storedKey);
    if (!deserializedKey)
      return;

    return JSON.stringify({
      id: id,
      publicKey: deserializedKey.publicKey,
      encryptedPrivateKey: CryptoJS.AES.encrypt(deserializedKey.privateKey, passPhrase).toString()
    });
  }

  async setKeyData(keyData, passPhrase) {
    const keys = JSON.parse(keyData);

    const id = keys.id;

    const deserialisedKey = {
      publicKey: keys.publicKey,
      privateKey: CryptoJS.AES.decrypt(keys.encryptedPrivateKey, passPhrase).toString(CryptoJS.enc.Utf8),
    };

    try {
      await this._keystore._store.put(id, JSON.stringify(deserialisedKey));
    } catch (e) {
      console.log(e);
    }
    this._keystore._cache.set(id, deserialisedKey);

    return id;
  }
}