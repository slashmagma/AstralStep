import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseLoginService } from '../servicios/firebase-login.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {

  constructor( private router:Router,private logoutFirebase:FirebaseLoginService, public toast:ToastController) { }

  ngOnInit() {
  }
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
  competencia(){this.router.navigate(["/competir"])} 
}
