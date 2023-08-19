import { Course } from "../../courses/models";
import { User } from "../../users/models";

export interface Enroll {
  id: number;
  courseId: number;
  userId: number;
}

export interface EnrollWithUserAndCourse extends Enroll {
  course: Course;
  user: User;
}

export interface CreateEnrollPayload {
  courseId: number | null;
  userId: number | null;
}

export interface CreateEnrollData {
  courseId: number;
  userId: number;
}

export interface UpdateEnrollData {
  id: number;
  courseId: number;
  userId: number;
}
