export interface Student {
  id: number
  name: string
  lastName: string;
  email: string;
  age: number;
}

export interface CreateStudentData {
  name: string
  lastName: string;
  email: string;
  age: number;
}

export interface UpdateStudentData {
  name?: string
  lastName?: string;
  email?: string;
  age?: number;
}
