import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentsListComponent } from './tournaments-list/tournaments-list.component';
import { NewTournamentComponent } from './new-tournament/new-tournament.component';

const routes: Routes = [
  { path: '', component: TournamentsListComponent },
  { path: 'new', component: NewTournamentComponent },
  { path: 'edit/:id', component: NewTournamentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentsRoutingModule {}
