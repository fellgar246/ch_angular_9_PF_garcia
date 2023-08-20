export interface Course {
  id: number;
  nameCourse: string;
  description: string;
}

export interface CreateCourseData {
  nameCourse: string;
  description: string;
}

export interface UpdateCourseData {
  nameCourse: string;
  description: string;
}
