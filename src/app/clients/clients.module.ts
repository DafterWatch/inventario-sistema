import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { NewClientComponent } from './new-client/new-client.component';


@NgModule({
  declarations: [ClientsListComponent, NewClientComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientsModule { }
