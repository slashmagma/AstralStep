import { Component, OnInit, inject } from '@angular/core';
import { usuarioI } from '../modelos/models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebasesignupService } from '../servicios/firebasesignup.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseLoginService } from '../servicios/firebase-login.service';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formulario = new FormGroup({
    uid : new FormControl(''),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  });
  utilSvc = inject(ApiService);
  
  constructor(public alerta:AlertController,private router:Router,private afAtuh:AngularFireAuth, private logout:FirebaseLoginService,private firesignup:FirebasesignupService,public toast:ToastController) { }

  ngOnInit() {
  }
  
async submit(){
  if (this.formulario.valid){
    const loading = await this.utilSvc.loading();
    await loading.present();

    this.firesignup.registrarusu(this.formulario.value as usuarioI).then(res =>{
      console.log(res);
      this.router.navigate(['/home'])
      localStorage.setItem('ingresado','true');
    }).catch(error =>{
      console.log(error);
        this.utilSvc.presentToast({
          message: error.message,
          duration:2500,
          position:'bottom',
        })
      const errorcode = error.code;
        
      if (errorcode == 'auth/email-already-in-use'){ console.log("email")
        this.correoUsado()
       }
       /*////////////////////////colocar un error si hay contraseñas repetidos *////////////////////////
      else if(errorcode == 'auth-invalid-email')
        this.correoInvalido()


      else if(errorcode == 'auth/weak-password')
       this.contraError()
    }).finally(()=>{
      loading.dismiss();
    })

    }
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
