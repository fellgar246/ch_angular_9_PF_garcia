import { Course } from "../../courses/models";
import { Student } from "../../students/models";


export interface Enroll {
  id: number;
  courseId: number;
  studentId: number;
}

export interface EnrollWithStudentAndCourse extends Enroll {
  course: Course;
  student: Student;
}

export interface CreateEnrollPayload {
  courseId: number | null;
  studentId: number | null;
}

export interface CreateEnrollData {
  courseId: number;
  studentId: number;
}

export interface UpdateEnrollData {
  courseId: number;
  studentId: number;
}
