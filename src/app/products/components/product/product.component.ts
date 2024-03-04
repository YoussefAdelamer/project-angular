import { Component, OnInit,Input, Output, EventEmitter  } from '@angular/core';
import { product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  @Input() data!:product
  @Output() item = new EventEmitter();
  addButton:boolean = false;
  amount:number = 0

  constructor(){}
  ngOnInit() {

  }

  add() {
    this.item.emit({item:this.data, quantity:this.amount});
  }
}
