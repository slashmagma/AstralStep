import { Injectable } from '@angular/core';
import { usuarioI } from '../modelos/models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebasesignupService {

  constructor(private auth:AngularFireAuth) { }
  
  registrarusu(user:usuarioI){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }
}
