import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Home } from '../home';

interface Mes {
  nombre: string;
  numero: number;
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {
  meses: Mes[] = [
    { nombre: 'Enero', numero: 1 },
    { nombre: 'Febrero', numero: 2 },
    { nombre: 'Marzo', numero: 3 },
    { nombre: 'Abril', numero: 4 },
    { nombre: 'Mayo', numero: 5 },
    { nombre: 'Junio', numero: 6 },
    { nombre: 'Julio', numero: 7 },
    { nombre: 'Agosto', numero: 8 },
    { nombre: 'Septiembre', numero: 9 },
    { nombre: 'Octubre', numero: 10 },
    { nombre: 'Noviembre', numero: 11 },
    { nombre: 'Diciembre', numero: 12 }
  ];
  anios: number[] = [];
  mesSeleccionado: string = "";
  anioSeleccionado: number = 0;
  list: Home[] = [];
  totalGananciaMes: number = 0;
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    const fechaActual = new Date();
    this.mesSeleccionado = (fechaActual.getMonth() + 1).toString();
    this.anioSeleccionado = fechaActual.getFullYear();
    for (let i = 2020; i <= 2030; i++) {
      this.anios.push(i);
    }
    this.filtrarFecha()
  }
  filtrarFecha() {
    this.http
    .post(environment.apiEndpoint + '/home', {fecha:'01-'+this.mesSeleccionado+'-'+this.anioSeleccionado})
    .subscribe(
      (res) => {
        this.list = res as any; // respuesta del servidor
        this.list.sort(function (a, b) {
          if (a.id > b.id) {
            return -1;
          }
          if (a.id < b.id) {
            return 1;
          }
          return 0;
        }); // ordenar por id desc
        this.calcularTotalGanancia();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  calcularTotalGanancia() {
    this.totalGananciaMes = 0;
    for (const item of this.list) {
      this.totalGananciaMes += Number(item.montpayed);
    }
  }
}
