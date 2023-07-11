import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { NewProductComponent } from './new-product/new-product.component';
import { SaleProductComponent } from './sale-product/sale-product.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'new', component: NewProductComponent },
  { path: 'edit/:id', component: NewProductComponent },
  { path: 'sale/:id', component: SaleProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
