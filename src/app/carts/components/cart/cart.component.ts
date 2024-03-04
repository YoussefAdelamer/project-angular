import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  success:boolean = false;



  constructor(private service:CartsService){}


  cartProdcuts:any[] = []
total:any = 0;

ngOnInit() {
this.getCartProducts()
}

minsAmount(index:number) {
this.cartProdcuts[index].quantity--
this.getCartTotal()
localStorage.setItem( 'cart',JSON.stringify(this.cartProdcuts));     //Sent update Data
}

addAmount(index:number) {
this.cartProdcuts[index].quantity++
this.getCartTotal()
localStorage.setItem( 'cart',JSON.stringify(this.cartProdcuts));     //Sent update Data
}

getCartProducts(){
  if('cart' in localStorage) {
    this.cartProdcuts = JSON.parse(localStorage.getItem( "cart" )!);
  }
this.getCartTotal()
}

detectchange(){
this.getCartTotal()
localStorage.setItem( 'cart',JSON.stringify(this.cartProdcuts));     //Sent update Data
}



delete(index:number){
  this.cartProdcuts.splice(index , 1)
  this.getCartTotal()
  localStorage.setItem( 'cart',JSON.stringify(this.cartProdcuts));     //Sent update Data
}

clearCart(){
  this.cartProdcuts = []
  this.getCartTotal()
  localStorage.setItem( 'cart',JSON.stringify(this.cartProdcuts));     //Sent update Data
}


getCartTotal(){
this.total = 0
for(let x in this.cartProdcuts) {
  this.total += this.cartProdcuts[x].item.price * this.cartProdcuts[x].quantity;
}
}

addcart(){
  let products = this.cartProdcuts.map(item => {
  return  {productId:item.item.id , quantity: item.quantity }
  })
let Model = {
  userId:5,
  date: new Date(),
  products:products
}

this.service.createNewCart(Model).subscribe(res => {
  this.success = true
})

console.log(Model)
}
}
