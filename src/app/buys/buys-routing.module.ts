import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuysListComponent } from './buys-list/buys-list.component';

const routes: Routes = [
  { path: '', component: BuysListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuysRoutingModule {}
