import { Injectable } from '@angular/core';
import { CreateStudentData, UpdateStudentData, Student } from './models';
import { BehaviorSubject, Observable, Subject, delay, of, take, map, mergeMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { generateRandomString } from 'src/app/shared/utils/helpers';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _students$ = new BehaviorSubject<Student[]>([]);
  public students$ = this._students$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService,private httpClient: HttpClient) {}

  loadStudents(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Student[]>(environment.baseApiUrl + '/students', {
      headers: new HttpHeaders({
        'token': '123456'
      }),
      params: {
        page: 1
      }
    }).subscribe({
      next: (response) => {
        this._students$.next(response)

      },
      error: () => {
        this.notifier.showError('Error','Error al cargar los alumnos')
      },
      complete: () => {
        this._isLoading$.next(false);
      }
    })
  }

  getStudents(): Subject<Student[]> {
    return this._students$
  }

  getStudentById(id: number): Observable<Student | undefined> {
    return this.students$.pipe(
      map((students) => students.find((student) => student.id === id)),
      take(1)
    )
  }

  createStudent(user: CreateStudentData): void {
    const token = generateRandomString(15)

    this.httpClient.post<Student>(environment.baseApiUrl + '/students', {...user, token})
      .pipe(
        mergeMap((studentCreated)=> this.students$.pipe(
          take(1),
          map(
            (arrayActual) => ([...arrayActual, studentCreated])
          )
          )
        ),
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._students$.next(arrayActualizado);
        }
    })
  }

  updateStudentById(id: number, studentActualizado: UpdateStudentData): void {
    this.httpClient.put<Student>(environment.baseApiUrl + `/students/${id}`, studentActualizado).subscribe({
      next: ()=> this.loadStudents(),
    })
  }


  deleteStudentById(id: number): void {
    this.httpClient.delete(environment.baseApiUrl + `/students/${id}`)
      .pipe(
        mergeMap(
          (responseStudentDeleted) => this.students$.pipe(
            take(1),
            map((arrayActual) => arrayActual.filter((student) => student.id !== id))
          )
        )
      ).subscribe({
        next: (arrayActualizado) => {
          this._students$.next(arrayActualizado);
        }
      })
  }


}
