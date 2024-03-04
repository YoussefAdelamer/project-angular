import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';




@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllProducts(  ) {
    return this.http.get(environment.baseApi + 'products');
  }


  getAllCategories() {
    return this.http.get(environment.baseApi + 'products/categories');
  }

  getProductsByCategories(keyword:string) {
    return this.http.get(environment.baseApi + 'products/category/'+ keyword);
  }


  getProductById(id:any) {
    return this.http.get(environment.baseApi + 'products/'+ id );
  }
}
