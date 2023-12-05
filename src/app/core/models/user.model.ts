import { PointData } from "./point.model";

/**
 * Пользователь.
 */
export interface User {
  username: string;
  points: PointData[];
  token?: string;
}

/**
 * Данные для входа пользователя.
 */
export interface UserCredentials {
  username: string;
  password: string;
}
