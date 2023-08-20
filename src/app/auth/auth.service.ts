import { Injectable } from "@angular/core";
import { LoginPayload } from "./models";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { User } from "../dashboard/pages/users/models";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AuthActions } from "../store/auth/auth.actions";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private notifier: NotifierService,
    private router: Router,
    private httpClient: HttpClient,
    private store: Store
  ) {}


  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<User[]>(environment.baseApiUrl +'/users', {
      params: {
        token: localStorage.getItem('token') || 'invalido'
      }
    }). pipe(
      map((userResult) => {

        if(userResult.length){
          const authUser = userResult[0];
          this.store.dispatch(AuthActions.setAuthUser({ payload: authUser }))
        }
        return !!userResult.length
      })
    )
  }

  login(payload: LoginPayload): void {
    this.httpClient.get<User[]>(environment.baseApiUrl +'/users', {
      params: {
        email: payload.email || '',
        password: payload.password || ''
      }
    }).subscribe({
      next: (response) => {
        if(response.length){
          const authUser = response[0];
          this.store.dispatch(AuthActions.setAuthUser({ payload: authUser }))
          this.router.navigate(['/dashboard/home/']);
          localStorage.setItem('token', authUser.token)
        }else{
          this.notifier.showError('Dato no válido','Email o contrasena invalida');
          this.store.dispatch(AuthActions.setAuthUser({ payload: null }))
        }
      },
      error: (err) => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.notifier.showError('Error','Email o contraseña inválida');
          }
          this.notifier.showError('Error','Ha ocurrido un error');
        }
      }
    })
  }

  public logout(): void {
    this.store.dispatch(AuthActions.setAuthUser({ payload: null }))
    localStorage.removeItem('token')
  }

}
