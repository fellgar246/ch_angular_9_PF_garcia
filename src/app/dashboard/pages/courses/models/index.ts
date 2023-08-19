export interface Course {
  id: number;
  nameCourse: string;
  category: number;
}

export interface CreateCourseData {
  nameCourse: string;
  category: number;
}

export interface UpdateCourseData {
  nameCourse: string;
  category: number;
}
