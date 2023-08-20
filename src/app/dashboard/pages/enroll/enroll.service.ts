import { Injectable } from '@angular/core';
import { Enroll } from './models';
import { BehaviorSubject, take, mergeMap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {

  private _enroll$ = new BehaviorSubject<Enroll[]>([]);
  public enroll$ = this._enroll$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private httpClient: HttpClient) {}

  deleteCourseById(id: Number): void {
    this.httpClient.delete(environment.baseApiUrl + `/enrollments/${id}`)
    .pipe(
      mergeMap(
        (responseEnrollDeleted) => this.enroll$.pipe(
          take(1),
          map((arrayActual) => arrayActual.filter((enrollment) => enrollment.id !== id))
        )
      )
    ).subscribe({
      next: (arrayActualizado) => {
        this._enroll$.next(arrayActualizado);
      }
    })
  }
}
