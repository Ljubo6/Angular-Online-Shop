import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../shared/product.service";
import {Product} from "../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  products:Product[]= []
  pSub!:Subscription
  rSub!: Subscription
  productName = ''
  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.pSub = this.productService.getAll().subscribe(products => {
      this.products = products
    })
  }

  ngOnDestroy(): void {
    if (this.pSub){
      this.pSub.unsubscribe()
    }
    if (this.rSub){
      this.rSub.unsubscribe()
    }
  }


  remove(id:any) {
    this.rSub = this.productService.remove(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id)
    })
  }
}
