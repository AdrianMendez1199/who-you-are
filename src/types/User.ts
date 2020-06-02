export interface User {
  name: string;
  lastname: string;
  username: string;
  friends: [];
}

export interface Auth {
  token: string;
  user: User;
}

export interface Friends {
  friends: User[];
}
