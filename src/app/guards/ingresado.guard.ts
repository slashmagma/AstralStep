import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class IngresadoGuard implements CanActivate {
  navCtrl= inject (NavController);
  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('ingresado')) {
      return true;
    } else {
      this.navCtrl.navigateRoot('login1');
      return false
    }

  }
}