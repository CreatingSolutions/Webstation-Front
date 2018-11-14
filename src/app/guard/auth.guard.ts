import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true;
        }

        this.router.navigate(['/'], { queryParams: {returnUrl: state.url, modal: true}}).then(
          success => {
            console.log(success);
            return true;
          }
        ).catch(error => {
          console.log(error);
          return false;
        });
    }
}
