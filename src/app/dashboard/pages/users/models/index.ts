export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  token: string;
  role: string;
}

export interface CreateUserData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateUserData {
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
}
