import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor() { }

  crearGrupo() {
    // Lógica para crear un grupo
    console.log('Crear grupo');
    // Puedes agregar aquí la lógica para la creación del grupo
  }

  unirseGrupo() {
    // Lógica para unirse a un grupo
    console.log('Unirse a un grupo');
    // Puedes agregar aquí la lógica para unirse a un grupo
  }

  verRutaConMasPasos() {
    // Lógica para ver la ruta con más pasos
    console.log('Ver ruta con más pasos');
    // Puedes agregar aquí la lógica para mostrar la ruta con más pasos
  }

}
