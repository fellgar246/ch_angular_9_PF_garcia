export interface Course {
  id: Number;
  nameCourse: String;
  category: number;
}

export interface CreateCourseData {
  nameCourse: String;
  category: number;
}

export interface UpdateCourseData {
  nameCourse: String;
  category: number;
}
