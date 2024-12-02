import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { usuarioI } from '../modelos/models';


@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {
  auth = inject(AngularFireAuth);
  utilSvc = inject(ApiService);

  constructor(private router: Router) { }

  login(user : usuarioI) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }
  logout() {
    getAuth().signOut();
    localStorage.removeItem('ingresado')
    localStorage.removeItem('user')
    this.utilSvc.routerLink('/login1')

  }
}