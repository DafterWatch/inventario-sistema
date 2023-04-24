import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';

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
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      id: [0],
      name: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: [0, [Validators.required]],
    });
  }

  ngOnInit(): void {
    console.log(this.form.value);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
