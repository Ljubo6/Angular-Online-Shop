import {Component, OnInit} from '@angular/core';
import {Product} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {ProductService} from "../../shared/product.service";
import {OrderService} from "../../shared/order.service";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit{
  orders:any = []
  pSub!:Subscription
  rSub!: Subscription
  productName = ''
  constructor(
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.pSub = this.orderService.getAll().subscribe(orders => {
      this.orders = orders
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
    this.rSub = this.orderService.remove(id).subscribe(() => {
      this.orders = this.orders.filter((order:any) => order.id !== id)
    })
  }
}
