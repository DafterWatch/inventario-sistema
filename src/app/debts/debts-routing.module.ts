import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebtsListComponent } from './debts-list/debts-list.component';
import { NewDebtComponent } from './new-debt/new-debt.component';

const routes: Routes = [
  { path: '', component: DebtsListComponent },
  { path: 'new', component: NewDebtComponent },
  { path: 'edit/:id', component: NewDebtComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DebtsRoutingModule {}
