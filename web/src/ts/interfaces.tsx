
interface User {
  url: string,
  linkTitle: string
};

/* Context */
interface UserContextInterface {
  user: {} | null,
  setUser: Function,
  isAuth: boolean,
  setIsAuth: Function
}

/* Common */
interface ReactNoteInterface {
  children: React.ReactNode
}

export type {
  User,
  UserContextInterface,
  ReactNoteInterface
}