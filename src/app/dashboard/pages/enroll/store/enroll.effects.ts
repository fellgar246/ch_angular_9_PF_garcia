import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, take } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { EnrollActions } from './enroll.actions';
import { HttpClient } from '@angular/common/http';
import { CreateEnrollPayload, Enroll, EnrollWithUserAndCourse } from '../models';
import { environment } from 'src/environments/environment';
import { User } from '../../users/models';
import { Course } from '../../courses/models';
import { Store } from '@ngrx/store';


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

  loadUserOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollActions.loadUserOptions),
      concatMap(() =>
        this.getUserOptions().pipe(
          map(data => EnrollActions.loadUserOptionsSuccess({ data })),
          catchError(error => of(EnrollActions.loadUserOptionsFailure({ error }))))
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

  private getEnrollFromDB(): Observable<EnrollWithUserAndCourse[]> {
    return this.httpClient.get<EnrollWithUserAndCourse[]>(environment.baseApiUrl + '/enrollments?_expand=user&_expand=course')
  }

  private getUserOptions(): Observable<User[]>{
    return this.httpClient.get<User[]>(environment.baseApiUrl + '/users')
  }

  private getCourseOptions(): Observable<Course[]>{
    return this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses')
  }

  private createEnrollment(payload: CreateEnrollPayload): Observable<Enroll> {
    return this.httpClient.post<Enroll>(environment.baseApiUrl + '/enrollments', payload)
  }
}
