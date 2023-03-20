import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products = [
    {
      id: 1,
      name: 'Producto 1',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 1',
      quantity: 100,
    },
    {
      id: 2,
      name: 'Producto 2',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      quantity: 200,
    },
    {
      id: 3,
      name: 'Producto 3',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      quantity: 200,
    },
    {
      id: 4,
      name: 'Producto 4',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      quantity: 200,
    },
    {
      id: 5,
      name: 'Producto 5',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      quantity: 200,
    },
    {
      id: 6,
      name: 'Producto 6',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      quantity: 200,
    },
    {
      id: 7,
      name: 'Producto 7',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      quantity: 200,
    },
    {
      id: 8,
      name: 'Producto 8',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      quantity: 200,
    },
    {
      id: 9,
      name: 'Producto 9',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      quantity: 200,
    },
    {
      id: 10,
      name: 'Maze of Memory Display',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'MAZE - Display de 24 sobres',
      quantity: 200,
    },
    {
      id: 11,
      name: 'Maze of Memory Sobre Individual',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'MAZE - Sobre individual',
      quantity: 200,
    },
  ];
  filteredProducts:any[] = []
  constructor() { }

  ngOnInit(): void {
    this.filteredProducts = this.products;
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.searchTerm) {
  //     this.filterProducts();
  //   }
  // }
  showNoResults: boolean = false;
  gridView: boolean = false;
  searchTerm: string = '';

  setListView() {
    this.gridView = false;
  }

  setGridView() {
    this.gridView = true;
  }
  filterProducts() {
    const searchTermTrimmed = this.searchTerm.trim().toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchTermTrimmed) ||
      product.description.toLowerCase().includes(searchTermTrimmed)
      //product.quantity.toString().includes(searchTermTrimmed)
    );
    if (this.filteredProducts.length === 0) {
      this.showNoResults = true;
    } else {
      this.showNoResults = false;
    }
  }

}
