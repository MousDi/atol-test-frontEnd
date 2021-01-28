import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  currentProduct :Product;
  message = '';
 
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { 
     
    }

  ngOnInit() {
    this.message = '';
    this.getProduct(this.route.snapshot.paramMap.get('id'));
    console.log(this.route.snapshot.paramMap.get('id'));
   

  }


  getProduct(id) {
    this.productService.get(id)
      .subscribe(
        (data: any) => {
          this.currentProduct = JSON.parse(data);
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  updateProduct() {
    this.productService.update(this.currentProduct._id, this.currentProduct)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The product was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteProduct() {
    this.productService.delete(this.currentProduct._id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/products']);
        },
        error => {
          console.log(error);
        });
  }

}
