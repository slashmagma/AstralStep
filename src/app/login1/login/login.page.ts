import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';
import { usuarioI } from 'src/app/modelos/models';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  formulario = new FormGroup({
    uid : new FormControl(''),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  });


  utilSvc = inject(ApiService);
  router = inject(Router);
  loginFirebase = inject(FirebaseLoginService)
  

  ngOnInit() {
  }


async submit(){
  if (this.formulario.valid){
    const loading = await this.utilSvc.loading();
    await loading.present();

    this.loginFirebase.login(this.formulario.value as usuarioI).then(res =>{
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
    }).finally(()=>{
      loading.dismiss();
    })

  }
  
}
}
