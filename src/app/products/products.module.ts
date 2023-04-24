import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NewProductComponent } from './new-product/new-product.component';


@NgModule({
  declarations: [ProductListComponent, NewProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
