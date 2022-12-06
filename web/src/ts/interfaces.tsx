import { UserClass } from './classes';

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

/* Common */
interface ReactNoteInterface {
  children: React.ReactNode
}

export type {
  UserContextInterface,
  ReactNoteInterface
}