import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnroll from './enroll.reducer';

export const selectEnrollState = createFeatureSelector<fromEnroll.State>(
  fromEnroll.enrollFeatureKey
);

export const selectErollments = createSelector(selectEnrollState, (state) => state.data)

export const selectStudentOptions = createSelector(selectEnrollState, (state) => state.studentOptions)

export const selectCourseOptions = createSelector(selectEnrollState, (state) => state.courseOptions)
