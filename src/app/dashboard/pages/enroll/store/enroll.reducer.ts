import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollActions } from './enroll.actions';
import { EnrollWithUserAndCourse } from '../models';
import { Course } from '../../courses/models';
import { User } from '../../users/models';

export const enrollFeatureKey = 'enroll';

export interface State {
  data: EnrollWithUserAndCourse[];
  userOptions: User[];
  courseOptions: Course[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  data: [],
  userOptions: [],
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
  on(EnrollActions.loadUserOptions, (state) => state),
  on(EnrollActions.loadUserOptionsSuccess,(state, action) => {
    return {
      ...state,
      userOptions: action.data
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

