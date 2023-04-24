import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  showNoResults: boolean = false;
  gridView: boolean = false;
  searchTerm: string = '';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    // this.filteredProducts = this.products;
    this.getProducts();
  }
  setListView() {
    this.gridView = false;
  }
  setGridView() {
    this.gridView = true;
  }
  filterProducts() {
    const searchTermTrimmed = this.searchTerm.trim().toLowerCase();
    this.filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTermTrimmed) || // buscar por nombre
        product.description.toLowerCase().includes(searchTermTrimmed) // buscar por descripcion
      //product.quantity.toString().includes(searchTermTrimmed)
    );
    if (this.filteredProducts.length === 0) {
      this.showNoResults = true;
    } else {
      this.showNoResults = false;
    }
  }
  getProducts() {
    this.http.get(environment.apiEndpoint + '/products').subscribe(
      (response: any) => {
        // Manejar la respuesta del servidor
        this.products = response; // respuesta del servidor
        this.products.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        }); // ordenar por name
        this.filteredProducts = this.products; // listado para el buscador
      },
      (error) => {
        console.error(error); // Manejar el error en caso de que ocurra
      }
    );
  }
  onDelete(id: number) {
    Swal.fire({
      title: 'Do you want to delete this row?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(environment.apiEndpoint + '/products/' + id).subscribe(
          () => {
            Swal.fire('Deleted!', '', 'success');
            this.getProducts();
          },
          (error) => console.error(error)
        );
      }
    });
  }
}
