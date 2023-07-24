import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { TournamentsRoutingModule } from './tournaments-routing.module';
import { TournamentsListComponent } from './tournaments-list/tournaments-list.component';
import { NewTournamentComponent } from './new-tournament/new-tournament.component';


@NgModule({
  declarations: [TournamentsListComponent, NewTournamentComponent],
  imports: [
    CommonModule,
    TournamentsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TournamentsModule { }
