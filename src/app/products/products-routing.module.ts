import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component'; // Importa el componente de la lista de productos

const routes: Routes = [
  { path: '', component: ListComponent } // Agrega la ruta para mostrar la lista de productos
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
