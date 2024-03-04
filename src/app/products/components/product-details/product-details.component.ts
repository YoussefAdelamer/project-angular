import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  id:any
  data:any = {}
  loading:boolean = false
constructor(private route:ActivatedRoute,
  private service:ProductService){
  this.id = this.route.snapshot.paramMap.get("id");
}
ngOnInit() {
this.getProduct()
}

getProduct(){
  this.loading= true
  this.service.getProductById(this.id).subscribe(res=> {
    this.data = res
    this.loading= false
  },error => {
    this.loading= false;
    alert(error)
  })
}
}
