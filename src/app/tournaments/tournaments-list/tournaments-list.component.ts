import { Component, OnInit } from '@angular/core';
import { Tournaments } from '../tournaments';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tournaments-list',
  templateUrl: './tournaments-list.component.html',
  styleUrls: ['./tournaments-list.component.scss']
})
export class TournamentsListComponent implements OnInit {

  tournaments: Tournaments[] = [];
  filteredTournaments: Tournaments[] = [];
  showNoResults: boolean = false;
  searchTerm: string = '';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getTournaments();
  }
  filterTournaments() {
    const searchTermTrimmed = this.searchTerm.trim().toLowerCase();
    this.filteredTournaments = this.tournaments.filter(
      (tour) =>
      tour.name.toLowerCase().includes(searchTermTrimmed) || // buscar por nombre cliente
      tour.lastname.toLowerCase().includes(searchTermTrimmed) || // buscar por apellido
      tour.ci.toLowerCase().includes(searchTermTrimmed) || // buscar por co
      (new Date(tour.dateaward)).toLocaleDateString().includes(searchTermTrimmed) // buscar por fecha
    );
    if (this.filteredTournaments.length === 0) {
      this.showNoResults = true;
    } else {
      this.showNoResults = false;
    }
  }
  getTournaments() {
    this.http.get(environment.apiEndpoint + '/tournaments').subscribe(
      (response: any) => {
        // Manejar la respuesta del servidor
        this.tournaments = response; // respuesta del servidor
        this.tournaments.sort(function (a, b) {
          if (a.id > b.id) {
            return -1;
          }
          if (a.id < b.id) {
            return 1;
          }
          return 0;
        }); // ordenar por id desc
        this.filteredTournaments = this.tournaments; // listado para el buscador
      },
      (error) => {
        console.error(error); // Manejar el error en caso de que ocurra
      }
    );
  }
}
