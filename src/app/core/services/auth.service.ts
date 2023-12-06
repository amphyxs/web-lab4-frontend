import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserCredentials } from '@core/models/user.model';
import { environment } from 'environments/environment';
import { Observable, map, tap, throwError } from 'rxjs';

interface LoginOrRegisterResponse {
  token: string;
};

/**
 * Сервис для аутентификации пользователя.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Ключ в local storage для данных пользователя.
   */
  private readonly USER_STORAGE_KEY = 'user';

  private _currentUser: User | null = null;

  public get currentUser(): User | null {
    return this._currentUser;
  }

  private set currentUser(value: User) {
    this._currentUser = value;
    this._storeUser();
  }

  public get authHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.currentUser?.token != undefined)
      headers = headers.set('Authorization', this.currentUser?.token);

    return headers;
  }

  constructor(
    private _http: HttpClient,
  ) { }

  /**
   * Совершить вход.
   * 
   * @param credentials данные пользователя для входа
   * @returns `Observable` с объектов ответа
   */
  public login(credentials: UserCredentials): Observable<Object> {
    const url = `${environment.apiUrl}/auth/login`;

    const loginObservable = this._http.post<LoginOrRegisterResponse>(url, credentials);

    return loginObservable.pipe(
      tap(res => {
        this.currentUser = {
          username: credentials.username,
          points: [],
          token: res.token,
        };
      }),
    );
  }

  /**
   * Зарегистрировать нового пользователя
   * 
   * @param credentials данные пользователя для регистрации
   * @returns `Observable` с объектов ответа
   */
  public register(credentials: UserCredentials): Observable<Object> {
    const url = `${environment.apiUrl}/auth/register`;

    const registerObservable = this._http.post<LoginOrRegisterResponse>(url, credentials);

    return registerObservable.pipe(
      tap(res => {
        this.currentUser = {
          username: credentials.username,
          points: [],
          token: res.token,
        };
      }),
    );
  }

  /**
   * Выйти из аккаунта.
   *
   * @returns `Observable` с объектов ответа
   */
  public logout(): Observable<Object> {
    localStorage.removeItem(this.USER_STORAGE_KEY);

    const url = `${environment.apiUrl}/auth/logout`;

    return this._http.post(
      url,
      null,
      {
        headers: this.authHeaders
      },
    );
  }

  public authViaToken(): boolean {
    const user = this._restoreUser();

    if (user == undefined || user.token == undefined) {
      return false;
    }

    this.currentUser = user;
    return true;
  }

  /**
   * Восстановить сохранённые данные пользователя.
   * 
   * @returns данные пользователя или `null`, если они не были сохранены
   */
  private _restoreUser(): User | null {
    const storedUserCredentials = localStorage.getItem(this.USER_STORAGE_KEY);

    return storedUserCredentials ? JSON.parse(storedUserCredentials) : null;
  }

  /**
   * Сохранить данные пользователя.
   */
  private _storeUser(): void {
    const userJSON = JSON.stringify(this._currentUser);
    
    localStorage.setItem(this.USER_STORAGE_KEY, userJSON);
  }
}
