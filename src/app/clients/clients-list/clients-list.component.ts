import { Component, OnInit } from '@angular/core';

import { Client } from '../client';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {

  clients: Client[] = [];
  filteredClients: Client[] = [];
  showNoResults: boolean = false;
  searchTerm: string = '';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getClients();
  }
  filterClients() {
    const searchTermTrimmed = this.searchTerm.trim().toLowerCase();
    this.filteredClients = this.clients.filter(
      (client) =>
      client.name.toLowerCase().includes(searchTermTrimmed) || // buscar por nombre
      client.lastname.toLowerCase().includes(searchTermTrimmed) || // buscar por descripcion
      client.ci.toLowerCase().includes(searchTermTrimmed) // buscar por descripcion
    );
    if (this.filteredClients.length === 0) {
      this.showNoResults = true;
    } else {
      this.showNoResults = false;
    }
  }
  getClients() {
    this.http.get(environment.apiEndpoint + '/clients').subscribe(
      (response: any) => {
        // Manejar la respuesta del servidor
        this.clients = response; // respuesta del servidor
        this.clients.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        }); // ordenar por name
        this.filteredClients = this.clients; // listado para el buscador
        console.log(this.filteredClients);

      },
      (error) => {
        console.error(error); // Manejar el error en caso de que ocurra
      }
    );
  }
  onDelete(id: number) {
    Swal.fire({
      title: 'Do you want to delete this row?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(environment.apiEndpoint + '/clients/' + id).subscribe(
          () => {
            Swal.fire('Deleted!', '', 'success');
            this.getClients();
          },
          (error) => console.error(error)
        );
      }
    });
  }


}
