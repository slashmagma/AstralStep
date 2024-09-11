import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {}

  registrar() {
    if (this.registroForm.valid) {
      const { username, email, password } = this.registroForm.value;
      // Lógica para registrar al usuario
      console.log('Nombre de usuario:', username);
      console.log('Email:', email);
      console.log('Contraseña:', password);
      // Aquí puedes agregar la llamada al servicio para registrar al usuario
    } else {
      console.log('Formulario no válido');
    }
  }
}
