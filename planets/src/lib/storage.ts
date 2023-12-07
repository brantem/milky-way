import { openDB, IDBPDatabase, StoreNames, StoreValue, StoreKey } from 'idb';

import { Schema } from '../types/storage';
import * as dummy from '../dummy';

const migrateV0ToV1 = (db: IDBPDatabase<Schema>) => {
  const oldDb = db as unknown as IDBPDatabase<Schema>;
  if (!oldDb.objectStoreNames.contains('files')) {
    const files = db.createObjectStore('files');
    for (const file of dummy.files) {
      files.add(file.body, file.key);
    }
  }

  if (!oldDb.objectStoreNames.contains('points')) {
    db.createObjectStore('points');
  }
};

const VERSION = 1;

class Storage {
  db: Promise<IDBPDatabase<Schema>>;

  constructor() {
    this.db = openDB('solar-system', VERSION, {
      async upgrade(db, oldVersion) {
        for (let i = oldVersion; i < VERSION; i++) {
          switch (i) {
            case 0:
              migrateV0ToV1(db);
              break;
          }
        }
      },
    });
  }

  async cursor<Name extends StoreNames<Schema>>(name: Name, query?: IDBKeyRange) {
    const db = await this.db;
    return db.transaction(name, 'readonly').store.openCursor(query);
  }

  async add<Name extends StoreNames<Schema>>(name: Name, key: StoreKey<Schema, Name>, value: StoreValue<Schema, Name>) {
    const db = await this.db;
    return db.add(name, value, key);
  }

  async get<Name extends StoreNames<Schema>>(name: Name, key: string) {
    const db = await this.db;
    return db.get(name, key);
  }

  async getAll<Name extends StoreNames<Schema>>(name: Name) {
    const db = await this.db;
    return db.getAll(name);
  }

  async getAllKeys<Name extends StoreNames<Schema>>(name: Name) {
    const db = await this.db;
    return db.getAllKeys(name);
  }

  async put<Name extends StoreNames<Schema>>(name: Name, key: StoreKey<Schema, Name>, value: StoreValue<Schema, Name>) {
    const db = await this.db;
    return db.put(name, value, key);
  }

  async delete<Name extends StoreNames<Schema>>(name: Name, key: StoreKey<Schema, Name>) {
    const db = await this.db;
    return db.delete(name, key);
  }
}

export default new Storage();
