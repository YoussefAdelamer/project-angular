import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { product } from '../../models/product';





@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.scss'
})
export class AllProductComponent implements OnInit {

  products:product[] =[]
  categories:string[] =[]
  loading:boolean = true;
  cartProdcuts:any[] = []


  constructor(private productService:ProductService) {
  }
ngOnInit() {
  this.getProducts()
  this.getCategoreis()
}

getProducts() {
  this.loading= true;
  this.productService.getAllProducts().subscribe((res:any) => {
this.products = res
this.loading = false;
  } , error => {
    this.loading = false;
    alert (error)
  })
}

getCategoreis() {
  this.loading = true;
  this.productService.getAllCategories().subscribe((res:any) => {
this.categories = res
this.loading = false;
  } , error => {
    this.loading = false;
    alert (error)
  })
}

filtercategories(event: any) {
  let value = event.target.value;
  (value == "all") ? this.getProducts() :   this.getProductsCategories(value)
}

getProductsCategories(keyword: string) {
  this.loading = true;
  this.productService.getProductsByCategories(keyword).subscribe((res:any) => {
    this.products = res
    this.loading = false;
  }, error => {
    this.loading = false;
    alert (error)
  })
}

addToCart(event: any){
  if("cart" in localStorage) {
    this.cartProdcuts = JSON.parse(localStorage.getItem('cart')!);
    let exist = this.cartProdcuts.find(item => item.item.id == event.item.id);     // because data storage in (item)
    if (exist) {
      alert("this product already in your cart")
    }else {
      this.cartProdcuts.push(event);
      localStorage.setItem( 'cart',JSON.stringify(this.cartProdcuts));
    }
  } else{
    this.cartProdcuts.push(event);
    localStorage.setItem( 'cart',JSON.stringify(this.cartProdcuts));
  }
  }
  // localStorage.setItem("cart", JSON.stringify(event));   //to show data in localstorage



  // JSON.stringify();  sent data
  // JSON.parse()      receive data
}
