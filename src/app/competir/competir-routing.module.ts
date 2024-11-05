import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompetirPage } from './competir.page';

const routes: Routes = [
  {
    path: '',
    component: CompetirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompetirPageRoutingModule {}
