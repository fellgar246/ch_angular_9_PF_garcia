export interface User {
  id: Number;
  name: String;
  lastName: String;
  age: Number;
  email: string;
  course: String;
  password: string;
  token: string;
}

export interface CreateUserData {
  name: String;
  lastName: String;
  age: Number;
  email: string;
  course: String;
  password: string;
}

export interface UpdateUserData {
  name?: String;
  lastName?: String;
  age?: Number;
  email?: string;
  course?: String;
  password?: string;
}
