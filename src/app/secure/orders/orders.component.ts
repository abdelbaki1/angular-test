import {Component, OnInit} from '@angular/core';
import {Order} from '../../interfaces/order';
import {OrderService} from '../../services/order.service';
import {saveAs} from 'file-saver';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Auth } from 'src/app/classes/auth';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('tableState', [
      state('show', style({
        maxHeight: '150px'
      })),
      state('hide', style({
        maxHeight: 0
      })),
      transition('show => hide', animate('1000ms ease-in')),
      transition('hide => show', animate('1000ms ease-out')),
    ])
  ]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  lastPage: number;
  selected: number;
  show = false;
  IsSorted: Boolean=false;
  IsFirstSorted:Boolean=false;
  type:string=Auth.user_type;
  order_perm: any;
  form :FormData
  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
///////refresh the paginator 
    this.load();
    this.order_perm = Auth.user.groups.filter(
      (role_string:string)=>role_string.endsWith('order')
      )

    }
    appendfile(files:FileList)
    {
      const file = files.item(0);
      this.form = new FormData();
      this.form.set('file',file);

    }
  import(){
      this.orderService.import(this.form)
        .subscribe((res:Order[]) => {
          this.ngOnInit()
          // add them to the order list
            
            // res.forEach(
            //   (res_order)=>this.orders.push(res_order)
            // )
            // console.log(res,this.orders);

          }
          ,(err:any)=>console.log(err)
  
        );
    
    
  }
  load(page = 1): void {
    this.orderService.all(page).subscribe(
      res => {
        // console.log(res);
        
        this.orders = res.data;
        
        this.lastPage = res.meta.total_pages;
        // console.log(this.lastPage);
        
        this.show = true;
      }
    );
  }

  select(id: number): void {
    this.selected = this.selected === id ? 0 : id;
  }

  itemState(id: number): string {
    return this.selected === id ? 'show' : 'hide';
  }

  export(): void {
    this.orderService.export().subscribe(
      res => {
        
        
        // blob =>
          // {saveAs(blob, 'order.csv')
        console.log(res);
        
        const blob = new Blob([res], {type: 'text/csv'});
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'orders.csv';
        link.click();
        console.log("download");
        
      }
      
      ,(err:any)=>console.log(err)
      
      
         
         
        
    );
  }
  sortorders(c:string,col:HTMLElement){
    console.log("sorting");
    if(!this.IsSorted){
      this.orders=<Order[]>this.orderService.sortArray(this.orders,c)
      console.log(this.orders);
      col.lastElementChild.classList.replace('fa-arrow-up','fa-arrow-down')
      console.log(col.lastElementChild.classList);
      this.IsFirstSorted=true;
      this.IsSorted=true;
      }
      else{
        this.orders=<Order[]>this.orderService.reverseArray(this.orders,c)
        col.lastElementChild.classList.replace('fa-arrow-down','fa-arrow-up')
        this.IsSorted=false
        console.log(col.lastElementChild.classList);
  
    
  }
}
  
}

