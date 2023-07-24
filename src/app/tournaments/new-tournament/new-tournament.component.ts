import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/clients/client';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.scss']
})
export class NewTournamentComponent implements OnInit {
  form: FormGroup;
  name = '';
  imageUrl = '';
  description = '';
  quantity = 0;
  price = 0;
  isNew: boolean = true;
  clients: Client[] = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = fb.group({
      id: [0],
      idclient: [0],
      nameclient: [''],
      lastname: [''],
      ci: [''],
      award: ['', [Validators.required]],
      received: [false],
      dateaward: new Date()
    });
  }

  ngOnInit(): void {
    this.getClients()
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNew = false;
      this.http.get(environment.apiEndpoint + '/tournaments/' + id).subscribe(
        (response: any) => {
          // Manejar la respuesta del servidor
          this.form.patchValue({
            id: response.id,
            idclient: response.idclient,
            nameclient: response.name,
            lastname: response.lastname,
            ci: response.ci,
            award: response.award,
            received: response.received,
            dateaward: response.dateaward,
          }); // datos id

        },
        (error) => {
          console.error(error); // Manejar el error en caso de que ocurra
        }
      );
    }
  }

  onSubmit() {
    if(this.form.value.nameclient != "" && this.form.value.idclient != 0){
      if (this.isNew) {
        this.submitTourPost()
      } else {
        this.submitPutTour()
      }
    } else {
      alert(`Tiene que seleccionar un usuario en el campo del ci de clientes registrados, si no aparece porfavor registre al cliente`)
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
      },
      (error) => {
        console.error(error); // Manejar el error en caso de que ocurra
      }
    );
  }
  public saveCode(e:any): void {
    let ci = e.target.value;
    let client = this.clients.filter(x => x.ci === ci)[0];
    this.form.patchValue({
      idclient: client.id,
      nameclient: client.name,
      lastname: client.lastname,
      ci: client.ci
    })
  }
  submitTourPost(){
    this.http
        .post(environment.apiEndpoint + '/tournaments', {
          idclient: this.form.value.idclient,
          award: this.form.value.award,
          received: this.form.value.received,
          dateaward: new Date().toISOString().split('T')[0],
        })
        .subscribe(
          (res) => {
            //exito
            Swal.fire({
              icon: 'success',
              title: 'Saved!',
              text: '',
            });
            this.router.navigate(['/tournaments']);
          },
          (error) => {
            console.error(error);
            // error
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        );
  }
  submitPutTour(){
    // edit exist tournaments
    this.http
    .put(
      environment.apiEndpoint + '/tournaments/' + this.form.value.id,
      {
        idclient: this.form.value.idclient,
        award: this.form.value.award,
        received: this.form.value.received,
        dateaward: this.form.value.dateaward,
      }
    )
    .subscribe(
      (res) => {
        //exito
        Swal.fire({
          icon: 'success',
          title: 'Edited!',
          text: '',
        });
        this.router.navigate(['/tournaments']);
      },
      (error) => console.error(error)
    );
  }
}
