import { Component, OnInit } from '@angular/core';
import{ FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder) { 
    this.formularioLogin = this.fb.group({
      'Nombre': new FormControl("",Validators.required),
      'password':new FormControl("",[Validators.required,Validators.minLength(8)])
    })
  }

  ngOnInit() {
  }
  ingresar() {
    if (this.formularioLogin.valid) {
      const { nombre, password } = this.formularioLogin.value;
      // Lógica para iniciar sesión
      console.log('Nombre:', nombre);
      console.log('Password:', password);
      // Aquí puedes agregar la llamada al servicio para autenticar al usuario
    } else {
      console.log('Formulario no válido');
    }
  }

}
