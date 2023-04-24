import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
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
      imageUrl: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: [0, [Validators.required]],
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNew = false;
      this.http.get('http://localhost:3000/products/' + id).subscribe(
        (response: any) => {
          // Manejar la respuesta del servidor
          this.form.patchValue({
            id: response.id,
            name: response.name,
            imageUrl: response.imageUrl,
            description: response.description,
            quantity: response.quantity,
          }); // datos id
        },
        (error) => {
          console.error(error); // Manejar el error en caso de que ocurra
        }
      );
    }
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.isNew) {
      // post new product
      // Enviar los datos al servidor para grabar en la base de datos
      this.http
        .post('http://localhost:3000/products', this.form.value)
        .subscribe(
          (res) => {
            //exito
            Swal.fire({
              icon: 'success',
              title: 'Saved!',
              text: '',
            });
            this.router.navigate(['/products']);
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
      // edit exist product
      this.http
        .put('http://localhost:3000/products/' + this.form.value.id, this.form.value)
        .subscribe(
          (res) => {
            console.log(res);
            //exito
            Swal.fire({
              icon: 'success',
              title: 'Edited!',
              text: '',
            });
            this.router.navigate(['/products']);
          },
          (error) => console.error(error)
        );
    }
  }
}
