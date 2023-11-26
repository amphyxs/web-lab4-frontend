import { Point } from "./point.model";

/**
 * Пользователь.
 */
export interface User {
  username: string;
  points: Point[];
}

/**
 * Данные для входа пользователя.
 */
export interface UserCredentials {
  username: string;
  password: string;
}
