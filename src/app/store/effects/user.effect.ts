import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { UserModule } from '../actions';
import {ApiService} from '../../services';
import ActionTypes = UserModule.ActionTypes;
import LogIn = UserModule.LogIn;
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import LogInSuccess = UserModule.LogInSuccess;
import SignUp = UserModule.SignUp;
import SignUpSuccess = UserModule.SignUpSuccess;
import SignUpFailure = UserModule.SignUpFailure;
import LogInFailure = UserModule.LogInFailure;

@Injectable()
export class UserEffects {
  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(ActionTypes.LOGIN),
    switchMap((login: LogIn) => this.apiService.login(login.payload.email, login.payload.password)),
    map(action => new LogInSuccess(action)),
    catchError(err => of(new LogInFailure(err)))
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(ActionTypes.SIGNUP),
    switchMap((login: SignUp) => this.apiService.register(login.payload.email, login.payload.password)),
    map(action => new SignUpSuccess(action)),
    catchError(err => of(new SignUpFailure(err)))
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(ActionTypes.LOGIN_SUCCESS),
    tap((login: LogInSuccess) => {
      localStorage.setItem('token', login.payload.applicationToken);
      this.router.navigate(['/']).catch(error => console.log(error));
    }),
    catchError(err => of(new LogInFailure(err)))
  );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(ActionTypes.SIGNUP_SUCCESS),
    tap(() => {
      this.router.navigate(['/']).catch(error => console.log(error));
    }),
    catchError(err => of(new LogInFailure(err)))
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(ActionTypes.LOGIN_FAILURE)
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(ActionTypes.SIGNUP_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(ActionTypes.LOGOUT),
    tap(() => {
      localStorage.removeItem('token');
    })
  );

  constructor(private apiService: ApiService, private  actions: Actions, private router: Router) {}
}
