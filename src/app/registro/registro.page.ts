import { Component, OnInit } from '@angular/core';
import { usuarioI } from '../modelos/models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebasesignupService } from '../servicios/firebasesignup.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseLoginService } from '../servicios/firebase-login.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  
  datos: usuarioI = {
  nombre: null ,
  correo: null ,
  uid: null,
  password: null,
 }
  
  constructor(public alerta:AlertController,private router:Router,private afAtuh:AngularFireAuth, private logout:FirebaseLoginService,private firesignup:FirebasesignupService,public toast:ToastController) { }

  ngOnInit() {
  }
  
async Registrar(){
    this.firesignup.registrarusu(this.datos).then(cred =>{
      this.MensajeCorrecto()
      this.router.navigate(["/login1"])
    }).catch(error =>{
      const errorcode = error.code;
        
      if (errorcode == 'auth/email-already-in-use'){ console.log("email")
        this.correoUsado()
       }
       /*////////////////////////colocar un error si hay contraseñas repetidos *////////////////////////
      else if(errorcode == 'auth-invalid-email')
        this.correoInvalido()


      else if(errorcode == 'auth/weak-password')
       this.contraError()
    })

    }

    async correoUsado(){
      const alert = await this.alerta.create({
        header: 'error de registro',
        message: 'el correo ya esta en uso',
        buttons: ['Aceptar']
      });
    
      await alert.present();
    }
    async correoInvalido(){
      const alert = await this.alerta.create({
        header: 'error de registro',
        message: 'el correo es invalido',
        buttons: ['Aceptar']
      });
    
      await alert.present();
    }
    async contraError(){
      const alert = await this.alerta.create({
        header: 'error de registro',
        message: 'la contraseña nesesitar ser de 6 caracteres minimo',
        buttons: ['Aceptar']
      });
    
      await alert.present();
    }
    async MensajeCorrecto() {
      const toast = await this.toast.create({
        message: 'usuario creado',
        duration: 2000
      });
      toast.present();
    }
}
