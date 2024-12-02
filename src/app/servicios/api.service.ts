import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject (Router);

  loading(){
    return this.loadingCtrl.create({spinner : 'circular'})
  }

  routerLink(url:string){
    return this.router.navigateByUrl(url);
  }
  

  async presentToast(opts?:ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
  
    await toast.present();
  
  }

}
