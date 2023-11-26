import { Injectable } from '@angular/core';
import { User, UserCredentials } from '@core/models/user.model';

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
  
  /**
   * Текущий залогиненный пользователь.
   */
  public get currentUser(): User | null {
    if (this._currentUser != undefined) {
      return this._currentUser;
    }

    const storedUserCredentials = this._restoreUserCredentials();
    if (storedUserCredentials == undefined) {
      return null;
    }

    this.login(storedUserCredentials);
    
    return this._currentUser;
  }

  private set currentUser(value: User) {
    this._currentUser = value;
    this._storeUserCredentials();
  }

  constructor() { }

  /**
   * Совершить вход.
   * 
   * @param credentials данные пользователя для входа
   * @throws {LoginError} если произошла ошибка при входе
   */
  public login(credentials: UserCredentials): void {
    // TODO: api
    const user = {
      username: credentials.username,
      points: [],
    }
    this.currentUser = user;
  }

  /**
   * Зарегистрировать нового пользователя
   * 
   * @param credentials данные пользователя для регистрации
   * @throws {RegisterError} если произошла ошибка регистрации
   */
  public register(credentials: UserCredentials): void {
    // TODO: api
    const user = {
      username: credentials.username,
      points: [],
    }
    this.currentUser = user;
  }

  /**
   * Восстановить сохранённые данные пользователя.
   * 
   * @returns данные пользователя или `null`, если они не были сохранены
   */
  private _restoreUserCredentials(): UserCredentials | null {
    const storedUserCredentials = localStorage.getItem(this.USER_STORAGE_KEY);

    return storedUserCredentials ? JSON.parse(storedUserCredentials) : null;
  }

  /**
   * Сохранить данные пользователя.
   */
  private _storeUserCredentials(): void {
    const userJSON = JSON.stringify(this._currentUser);
    
    localStorage.setItem(this.USER_STORAGE_KEY, userJSON);
  }
}

/**
 * Ошибка регистрации.
 */
export class RegisterError extends Error { }

/**
 * Ошибка входа в аккаунт.
 */
export class LoginError extends Error { }
