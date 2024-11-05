import { Component } from '@angular/core';
import { FirebaseLoginService } from '../servicios/firebase-login.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor( private router:Router,private logoutFirebase:FirebaseLoginService, public toast:ToastController) { }
 
  competencia(){this.router.navigate(["/competir"])} 
  estadisticas(){this.router.navigate(["/estadisticas"])}  
  
  async cerrarsession() {
    const toast = await this.toast.create({
      message: 'session cerrada',
      duration: 2000
    });
    toast.present();
  }

  logout(){
    this.logoutFirebase.logout()
    this.cerrarsession()
  }
}
