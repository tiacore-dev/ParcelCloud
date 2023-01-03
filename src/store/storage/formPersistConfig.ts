import { PersistConfig } from "redux-persist/es/types"
import { createStorage } from "./storage"

export const formPersistConfig = <S = any>(
    key: string,
    extra?: Omit<Partial<PersistConfig<S>>, 'key'>
): PersistConfig<S> => ({
    key,
    keyPrefix: '',
    storage: createStorage(),
    version: 7,
    serialize: false,
    timeout: null,
    debug: true,
    ...extra
})