import { Component, OnInit } from '@angular/core';
import { Debts } from '../debts';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-debts-list',
  templateUrl: './debts-list.component.html',
  styleUrls: ['./debts-list.component.scss']
})
export class DebtsListComponent implements OnInit {

  debts: Debts[] = [];
  filteredDebts: Debts[] = [];
  showNoResults: boolean = false;
  searchTerm: string = '';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getDebts();
  }
  filterDebts() {
    const searchTermTrimmed = this.searchTerm.trim().toLowerCase();
    this.filteredDebts = this.debts.filter(
      (debt) =>
      debt.nameclient.toLowerCase().includes(searchTermTrimmed) || // buscar por nombre cliente
      debt.lastname.toLowerCase().includes(searchTermTrimmed) || // buscar por apellido
      debt.ci.toLowerCase().includes(searchTermTrimmed) || // buscar por co
      debt.productname.toLowerCase().includes(searchTermTrimmed) || // buscar por nombre producto
      (new Date(debt.datebuy)).toLocaleDateString().includes(searchTermTrimmed) // buscar por fecha
    );
    if (this.filteredDebts.length === 0) {
      this.showNoResults = true;
    } else {
      this.showNoResults = false;
    }
  }
  getDebts() {
    this.http.get(environment.apiEndpoint + '/debts').subscribe(
      (response: any) => {
        // Manejar la respuesta del servidor
        this.debts = response; // respuesta del servidor
        this.debts.sort(function (a, b) {
          if (a.id > b.id) {
            return -1;
          }
          if (a.id < b.id) {
            return 1;
          }
          return 0;
        }); // ordenar por id desc
        this.filteredDebts = this.debts; // listado para el buscador
      },
      (error) => {
        console.error(error); // Manejar el error en caso de que ocurra
      }
    );
  }
}
