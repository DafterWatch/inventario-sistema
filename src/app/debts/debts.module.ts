import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { DebtsListComponent } from './debts-list/debts-list.component';
import { NewDebtComponent } from './new-debt/new-debt.component';
import { DebtsRoutingModule } from './debts-routing.module';


@NgModule({
  declarations: [DebtsListComponent, NewDebtComponent],
  imports: [
    CommonModule,
    DebtsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DebtsModule { }
