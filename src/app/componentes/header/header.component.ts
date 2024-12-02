import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, MenuController } from '@ionic/angular';
// import { PopoverOptionsComponent } from '../popover-options/popover-options.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  constructor(private router:Router, private popoverController: PopoverController, private menuCtrl: MenuController) { }
  @Input() titulo:String="";
  @Input() backUrl: string = '';
  @Input() options: { label: string, action: () => void }[] = []; // Las opciones para el popover
  @Input() backbutton!: string;
  @Input() isModal !: boolean;
  @Input() showMenu !: boolean;

  ngOnInit() {}
  volver(){this.router.navigate(["/home"])} 

  // async openOptions(ev: any) {
  //   if (this.showMenu) {
  //     await this.menuCtrl.toggle('menu-content');
  //   } else {
  //     const popover = await this.popoverController.create({
  //       component: PopoverOptionsComponent,
  //       event: ev,
  //       translucent: true,
  //       cssClass: 'custom-popover',
  //       componentProps: {
  //         options: this.options
  //       }
  //     });
  //     return await popover.present();
  //   }
  // }

}


