import { Injectable } from '@angular/core';
import { usuarioI } from '../modelos/models';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebasesignupService {

  constructor(private Atuh:AngularFireAuth) { }
  
  registrarusu(datos:usuarioI){
    return this.Atuh.createUserWithEmailAndPassword(datos.correo!, datos.password!);
  }
}
