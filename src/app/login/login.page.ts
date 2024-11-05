import { Component, OnInit } from '@angular/core';
import{ FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { FirebaseLoginService } from '../servicios/firebase-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,private access:FirebaseLoginService) { 
    this.formularioLogin = this.fb.group({
      'Nombre': new FormControl("",Validators.required),
      'password':new FormControl("",[Validators.required,Validators.minLength(8)])
    })
  }

  ngOnInit() {
  }
  ingresar() {
    if (this.formularioLogin.valid) {
     
    }
  }

}
