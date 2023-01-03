import { DBSchema, IDBPDatabase, openDB } from 'idb'

const dbKey = 'parcelcloud' as const;
const storeKey = 'store' as const;

interface ParcelCloudDB extends DBSchema {
    [storeKey]: {
        key: string;
        value: string;
    }
}

export class IDBStorage {
    private db: Promise<IDBPDatabase<ParcelCloudDB>>;

    constructor() {
        this.db = openDB<ParcelCloudDB>(dbKey, 10, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(storeKey)) {
                    db.createObjectStore(storeKey);
                }
            }
        });
    };

    get = async (key: string): Promise<string | null> => {
        const result = await (await this.db).get(storeKey, key)
        return result ?? null
    };

    set = async (key: string, value: string): Promise<void> => {
        await (await this.db).put(storeKey, value, key);
    };

    delete = async (key:string): Promise<void> => {
        await (await this.db).delete(storeKey, key);
    };

}