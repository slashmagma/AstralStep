import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { usuarioI } from '../modelos/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersCollection = this.firestore.collection<usuarioI>('usuarios');

  constructor(private firestore: AngularFirestore) {}
  
  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  // Agregar un nuevo usuario
  addUser(user: usuarioI): Promise<void> {
    const id = this.firestore.createId();
    return this.usersCollection.doc(id).set(user);
  }

  // Obtener todos los usuarios
  getUsers(): Observable<usuarioI[]> {
    return this.usersCollection.valueChanges({ idField: 'id' });
  }

  // Actualizar un usuario
  updateUser(id: string, user: Partial<usuarioI>): Promise<void> {
    return this.usersCollection.doc(id).update(user);
  }

  // Eliminar un usuario
  deleteUser(id: string): Promise<void> {
    return this.usersCollection.doc(id).delete();
  }
}