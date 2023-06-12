import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { NewClientComponent } from './new-client/new-client.component';

const routes: Routes = [
  { path: '', component: ClientsListComponent },
  { path: 'new', component: NewClientComponent },
  { path: 'edit/:id', component: NewClientComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
