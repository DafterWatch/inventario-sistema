import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product';

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
    this.http.get('http://localhost:3000/products').subscribe(
      (response: any) => {
        console.log(response)
        // Manejar la respuesta del servidor
        this.products = response; // respuesta del servidor
        this.filteredProducts = this.products; // listado para el buscador
      },
      (error) => {
        console.error(error); // Manejar el error en caso de que ocurra
      }
    );
  }
}
