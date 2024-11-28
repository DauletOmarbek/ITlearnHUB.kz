import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRole = route.data['role']; // Роль, указанная в маршруте
    const currentRole = this.authService.getRole(); // Текущая роль пользователя

    if (requiredRole && requiredRole !== currentRole) {
      // Если роль не совпадает, перенаправляем на страницу доступа
      this.router.navigate(['/access-denied']);
      return false;
    }

    return true; // Доступ разрешён
  }
}
