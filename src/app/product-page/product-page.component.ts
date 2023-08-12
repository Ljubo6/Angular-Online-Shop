import {Component, OnInit} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {Product} from "../shared/interfaces";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit{
  product$!:Observable<Product>
  constructor(
    private productService: ProductService,
    private route:ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.params
      .pipe(switchMap((params:Params) => {
        return this.productService.getById(params['id'])
      }))
  }

  addProduct(product:Product) {
    this.productService.addProduct(product)
  }
}
