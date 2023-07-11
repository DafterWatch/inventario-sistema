import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NewProductComponent } from './new-product/new-product.component';
import { SaleProductComponent } from './sale-product/sale-product.component';


@NgModule({
  declarations: [ProductListComponent, NewProductComponent, SaleProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
