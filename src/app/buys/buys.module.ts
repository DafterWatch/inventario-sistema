import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuysRoutingModule } from './buys-routing.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BuysListComponent } from './buys-list/buys-list.component';


@NgModule({
  declarations: [BuysListComponent],
  imports: [
    CommonModule,
    BuysRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BuysModule { }
