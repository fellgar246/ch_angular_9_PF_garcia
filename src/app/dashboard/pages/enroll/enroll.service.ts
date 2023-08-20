import { Injectable } from '@angular/core';
import { CreateEnrollData, UpdateEnrollData, Enroll } from './models';
import { BehaviorSubject, Observable, Subject, delay, of, take, mergeMap, map } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
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

  constructor(private notifier: NotifierService,private httpClient: HttpClient) {}

  loadEnrollments(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Enroll[]>(environment.baseApiUrl + '/enrollments').subscribe({
      next: (response) => {
        this._enroll$.next(response)

      },
      error: () => {
        this.notifier.showError('Error','Error al cargar inscripciones')
      },
      complete: () => {
        this._isLoading$.next(false);
      }
    })
  }

  createEnrollment(enrollment: CreateEnrollData): void {
    this.httpClient.post<Enroll>(environment.baseApiUrl + '/enrollments', {...enrollment })
      .pipe(
        mergeMap((enrollmentCreated)=> this.enroll$.pipe(
          take(1),
          map(
            (arrayActual) => ([...arrayActual, enrollmentCreated])
          )
          )
        ),
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._enroll$.next(arrayActualizado);
        }
    })
  }

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
