import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  form: FormGroup;
  name = '';
  imageUrl = '';
  description = '';
  quantity = 0;
  isNew: boolean = true;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = fb.group({
      id: [0],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      ci: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNew = false;
      this.http.get(environment.apiEndpoint + '/clients/' + id).subscribe(
        (response: any) => {
          // Manejar la respuesta del servidor
          this.form.patchValue({
            id: response.id,
            name: response.name,
            lastName: response.lastname,
            ci: response.ci,
          }); // datos id
        },
        (error) => {
          console.error(error); // Manejar el error en caso de que ocurra
        }
      );
    }
  }

  onSubmit() {
    if (this.isNew) {
      // post new client
      // Enviar los datos al servidor para grabar en la base de datos
      this.http
        .post(environment.apiEndpoint + '/clients', this.form.value)
        .subscribe(
          (res) => {
            //exito
            Swal.fire({
              icon: 'success',
              title: 'Saved!',
              text: '',
            });
            this.router.navigate(['/clients']);
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
    } else {
      // edit exist client
      this.http
        .put(
          environment.apiEndpoint + '/clients/' + this.form.value.id,
          this.form.value
        )
        .subscribe(
          (res) => {
            //exito
            Swal.fire({
              icon: 'success',
              title: 'Edited!',
              text: '',
            });
            this.router.navigate(['/clients']);
          },
          (error) => console.error(error)
        );
    }
  }
}
