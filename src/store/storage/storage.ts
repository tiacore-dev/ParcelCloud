import { WebStorage } from "redux-persist";
import { IDBStorage } from "./IDBStorage";


export function createStorage(): WebStorage {
    const idb = new IDBStorage();

    return {
        getItem: idb.get,
        setItem: idb.set,
        removeItem: idb.delete
    }
}