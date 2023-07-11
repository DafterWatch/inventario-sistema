import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sale-product',
  templateUrl: './sale-product.component.html',
  styleUrls: ['./sale-product.component.scss'],
})
export class SaleProductComponent implements OnInit {
  form: FormGroup;
  name = '';
  imageUrl = '';
  description = '';
  quantity = 0;
  price = 0;
  isNew: boolean = true;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = fb.group({
      id: [0],
      name: [''],
      imageurl: [''],
      description: [''],
      quantity: [0],
      price: [0],
      quantityToBuy: [
        '',
        [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)],
      ],
    });
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNew = false;
      this.http.get(environment.apiEndpoint + '/products/' + id).subscribe(
        (response: any) => {
          // Manejar la respuesta del servidor
          this.form.patchValue({
            id: response.id,
            name: response.name,
            imageurl: response.imageUrl,
            description: response.description,
            quantity: response.quantity,
            price: response.price,
          }); // datos id
          console.log(this.form.value);
        },
        (error) => {
          console.error(error); // Manejar el error en caso de que ocurra
        }
      );
    }
  }
  onSubmit() {
    // post sale product
    // Enviar los datos al servidor para grabar en la base de datos
    if (this.form.value.quantityToBuy <= this.form.value.quantity) {
      // realizar compra
      this.http
        .post(environment.apiEndpoint + '/buys', {
          idproduct: this.form.value.id,
          quantity: this.form.value.quantityToBuy,
          datebuy: new Date().toISOString().split('T')[0],
          price: this.form.value.price
        })
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
      alert(
        'La cantidad a comprar no puede ser mayor a la cantidad disponible'
      );
    }
  }
}
