import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollActions } from './enroll.actions';
import { EnrollWithStudentAndCourse } from '../models';
import { Course } from '../../courses/models';
import { Student } from '../../students/models';


export const enrollFeatureKey = 'enroll';

export interface State {
  data: EnrollWithStudentAndCourse[];
  studentOptions: Student[];
  courseOptions: Course[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data: [],
  studentOptions: [],
  courseOptions: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,

  on(EnrollActions.loadEnrolls, state => {
    return {
      ...state,
      loading: true
    }
  }),

  on(EnrollActions.loadEnrollsSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false
    }
  }),
  on(EnrollActions.loadEnrollsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),

  //Load User options
  on(EnrollActions.loadStudentOptions, (state) => state),
  on(EnrollActions.loadStudentOptionsSuccess,(state, action) => {
    return {
      ...state,
      studentOptions: action.data
    }
  }),

  //Load Course options
  on(EnrollActions.loadCourseOptions, (state) => state),
  on(EnrollActions.loadCourseOptionsSuccess,(state, action) => {
    return {
      ...state,
      courseOptions: action.data
    }
  }),
);

export const enrollFeature = createFeature({
  name: enrollFeatureKey,
  reducer,
});

