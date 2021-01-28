import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {


  product = new Product();
  submitted = false ;


  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.product.available = null;
    this.productService.setupSocketConnexion();
  }

  saveProduct() {
    // const data = {
    //   title: this.product.title,
    //   description: this.product.description
    // };

    this.productService.create(this.product)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newProduct() {
    this.submitted = false;
    this.product = new Product();
  }

}
