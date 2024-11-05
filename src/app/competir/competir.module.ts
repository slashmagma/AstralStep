import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompetirPageRoutingModule } from './competir-routing.module';

import { CompetirPage } from './competir.page';
import { ShareModule } from '../modulos/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompetirPageRoutingModule,
    ShareModule
  ],
  declarations: [CompetirPage]
})
export class CompetirPageModule {}
