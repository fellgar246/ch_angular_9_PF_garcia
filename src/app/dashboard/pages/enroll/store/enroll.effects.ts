import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, take } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { EnrollActions } from './enroll.actions';
import { HttpClient } from '@angular/common/http';
import { CreateEnrollPayload, Enroll, EnrollWithStudentAndCourse } from '../models';
import { environment } from 'src/environments/environment';
import { Course } from '../../courses/models';
import { Store } from '@ngrx/store';
import { Student } from '../../students/models';


@Injectable()
export class EnrollEffects {

  loadEnrolls$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollActions.loadEnrolls),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getEnrollFromDB().pipe(
          map(data => EnrollActions.loadEnrollsSuccess({ data })),
          catchError(error => of(EnrollActions.loadEnrollsFailure({ error }))))
      )
    );
  });

  loadStudentOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollActions.loadStudentOptions),
      concatMap(() =>
        this.getStudentOptions().pipe(
          map(data => EnrollActions.loadStudentOptionsSuccess({ data })),
          catchError(error => of(EnrollActions.loadStudentOptionsFailure({ error }))))
      )
    );
  });

  loadCourseOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollActions.loadCourseOptions),
      concatMap(() =>
        this.getCourseOptions().pipe(
          map(data => EnrollActions.loadCourseOptionsSuccess({ data })),
          catchError(error => of(EnrollActions.loadCourseOptionsFailure({ error }))))
      )
    );
  });

  createEnroll$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollActions.createEnrollment),
      concatMap((action) =>
        this.createEnrollment(action.payload).pipe(
          map(data => EnrollActions.createEnrollmentSuccess({ data })),
          catchError(error => of(EnrollActions.createEnrollmentFailure({ error }))))
      )
    );
  });

  createEnrollSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollActions.createEnrollmentSuccess),
      map(() => this.store.dispatch(EnrollActions.loadEnrolls()))
    );
  }, {dispatch: false});

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store) {}

  private getEnrollFromDB(): Observable<EnrollWithStudentAndCourse[]> {
    return this.httpClient.get<EnrollWithStudentAndCourse[]>(environment.baseApiUrl + '/enrollments?_expand=student&_expand=course')
  }

  private getStudentOptions(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(environment.baseApiUrl + '/students')
  }

  private getCourseOptions(): Observable<Course[]>{
    return this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses')
  }

  private createEnrollment(payload: CreateEnrollPayload): Observable<Enroll> {
    return this.httpClient.post<Enroll>(environment.baseApiUrl + '/enrollments', payload)
  }
}
