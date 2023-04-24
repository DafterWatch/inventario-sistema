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
  }

  onSubmit() {
    console.log(this.form.value);
    // Enviar los datos al servidor para grabar en la base de datos
    this.http.post('http://localhost:3000/products', this.form.value).subscribe(
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
  }
}
