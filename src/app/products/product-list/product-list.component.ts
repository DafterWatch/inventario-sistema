import { Component, OnInit } from '@angular/core';

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
      price: 100,
    },
    {
      id: 2,
      name: 'Producto 2',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      price: 200,
    },
    {
      id: 3,
      name: 'Producto 3',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      price: 200,
    },
    {
      id: 4,
      name: 'Producto 4',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      price: 200,
    },
    {
      id: 5,
      name: 'Producto 5',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      price: 200,
    },
    {
      id: 6,
      name: 'Producto 6',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      price: 200,
    },
    {
      id: 7,
      name: 'Producto 7',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      price: 200,
    },
    {
      id: 8,
      name: 'Producto 8',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      price: 200,
    },
    {
      id: 9,
      name: 'Producto 9',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      price: 200,
    },
    {
      id: 10,
      name: 'Producto 10',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      price: 200,
    },
    {
      id: 11,
      name: 'Producto 11',
      imageUrl: 'https://via.placeholder.com/150',
      description: 'Descripción del producto 2',
      price: 200,
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  gridView: boolean = false;

  setListView() {
    this.gridView = false;
  }


  setGridView() {
    this.gridView = true;
  }

}
