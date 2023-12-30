import { UserClass } from './classes';
import { CacheType, MedicalProfilesType } from './types';

/* Context */
interface UserContextInterface {
    user: UserClass,
    setUser: Function,
    isAuth: boolean,
    setIsAuth: Function,
    token: string,
    authenticate: Function,
    renounce: Function,
    medicalProfiles: MedicalProfilesType,
}

interface CommonContextInterface {
    darkMode: boolean,
    toggleDarkMode: (toggle: boolean | undefined) => void,
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