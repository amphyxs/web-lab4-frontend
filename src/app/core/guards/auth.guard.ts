import { HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { catchError, map, of, tap } from 'rxjs';

/**
 * Guard для проверки, аутентифицирован ли пользователь.
 * 
 * @param route текущий роут
 * @param state объект состояния
 * @returns аутентифицирован ли пользователь
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUser != undefined) {
    return true;
  }

  return authService.authViaToken().pipe(
    tap(isTokinValid => {
      if (!isTokinValid)
        router.navigate(['/login']);
    })
  );
};
