import { Component, OnInit } from '@angular/core';
import { FirebaseLoginService } from '../servicios/firebase-login.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Motion } from '@capacitor/motion';
import { StepCounter } from '../step-counter/step-counter';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  steps : number = 0;
  stepCounter : StepCounter;
  tracking: boolean = false;
  listener: any;

  constructor( private router:Router,private logoutFirebase:FirebaseLoginService, public toast:ToastController) { 

    this.stepCounter = new StepCounter(0.2);

  }
 
  async ngOnInit(){

    this.stepCounter.startStepTracking();

  }

  getSteps(): number {
    return this.stepCounter.getSteps(); // Usamos el getter público para obtener los pasos
  }

  // Método para comenzar o detener el conteo de pasos
  toggleStepTracking(): void {
    if (this.tracking) {
      this.stepCounter.stopStepTracking(); // Detenemos el seguimiento
    } else {
      this.stepCounter.startStepTracking(); // Comenzamos el seguimiento
    }
    this.tracking = !this.tracking; // Cambiamos el estado del seguimiento
  }
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
