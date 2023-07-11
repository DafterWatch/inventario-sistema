import { Component, OnInit } from '@angular/core';

import { Buys } from '../buys';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buys-list',
  templateUrl: './buys-list.component.html',
  styleUrls: ['./buys-list.component.scss']
})
export class BuysListComponent implements OnInit {

  buys: Buys[] = [];
  filteredBuys: Buys[] = [];
  showNoResults: boolean = false;
  searchTerm: string = '';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getBuys();
  }
  filterBuys() {
    const searchTermTrimmed = this.searchTerm.trim().toLowerCase();
    this.filteredBuys = this.buys.filter(
      (buy) =>
      buy.name.toLowerCase().includes(searchTermTrimmed) || // buscar por nombre
      (new Date(buy.datebuy)).toLocaleDateString().includes(searchTermTrimmed) // buscar por fecha
    );
    if (this.filteredBuys.length === 0) {
      this.showNoResults = true;
    } else {
      this.showNoResults = false;
    }
  }
  getBuys() {
    this.http.get(environment.apiEndpoint + '/buys').subscribe(
      (response: any) => {
        // Manejar la respuesta del servidor
        this.buys = response; // respuesta del servidor
        this.buys.sort(function (a, b) {
          if (a.id > b.id) {
            return -1;
          }
          if (a.id < b.id) {
            return 1;
          }
          return 0;
        }); // ordenar por id desc
        this.filteredBuys = this.buys; // listado para el buscador
      },
      (error) => {
        console.error(error); // Manejar el error en caso de que ocurra
      }
    );
  }
}

