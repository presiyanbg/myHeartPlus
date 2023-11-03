import { UserClass } from './classes';
import { CacheType } from './types';

/* Context */
interface UserContextInterface {
    user: UserClass,
    setUser: Function,
    isAuth: boolean,
    setIsAuth: Function,
    token: string,
    authenticate: Function,
    renounce: Function,
}

interface CommonContextInterface {
    monitorExpanded: boolean,
    toggleMonitorExpanded: (toggle: boolean | undefined) => void,
    cache: CacheType,
    setCache: (data: CacheType) => void
}

/* Common */
interface ReactNoteInterface {
    children: React.ReactNode
}

export type {
    UserContextInterface,
    ReactNoteInterface,
    CommonContextInterface
}