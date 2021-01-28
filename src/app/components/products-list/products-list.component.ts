import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';
import {io} from'socket.io-client';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  
  products: Product[];
  currentProduct = null;
  currentIndex = -1;
  name = '';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.retrieveProducts();
    this.productService.setupSocketConnexion();
  }






  retrieveProducts() {
    this.productService.getAll()
    .subscribe(
        (data: any) => {
          this.products = JSON.parse(data);
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveProducts();
    this.currentProduct = null;
    this.currentIndex = -1;
  }

  setActiveProduct(product, index) {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  removeAllProducts() {
    this.productService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveProducts();
        },
        error => {
          console.log(error);
        });
  }



}