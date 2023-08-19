export interface User {
  id: number;
  name: string;
  lastName: string;
  age: Number;
  email: string;
  course: String;
  password: string;
  token: string;
  role: string;
}

export interface CreateUserData {
  name: string;
  lastName: string;
  age: Number;
  email: string;
  course: String;
  password: string;
}

export interface UpdateUserData {
  name?: string;
  lastName?: string;
  age?: Number;
  email?: string;
  course?: String;
  password?: string;
  role?: string;
}
