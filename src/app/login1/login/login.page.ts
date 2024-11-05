import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo:string=""
  password:string=""

  constructor(public alerta:AlertController, public toast:ToastController, private router:Router,private loginFirebase:FirebaseLoginService) { }

  ngOnInit() {
  }
  async MensajeCorrecto() {
    const toast = await this.toast.create({
      message: 'inicio de sesion correcto',
      duration: 2000
    });
    toast.present();
  }

  async MensajeError(){
      const alert = await this.alerta.create({
        header: 'error de inicio',
        message: 'no puede ingresar con los campos de correo y contraseña vacios',
        buttons: ['Aceptar']
      });
    
      await alert.present();
    }
  

ingresar(){
  if(this.correo ===""|| this.password ===""){
    console.log("no puede haber valores vacios")
    this.MensajeError()
  }
  else{
    this.loginFirebase.login(this.correo, this.password).then(()=>{
      console.log("inicio de sesion exitoso")
      
      this.MensajeCorrecto()
      this.router.navigate(["/home"])
    }).catch(()=>{
      console.log("error al iniciar sesion")
      this.MensajeError();
    })

  }
}
}
