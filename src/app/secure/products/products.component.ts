import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Auth } from 'src/app/classes/auth';
import { User } from 'src/app/interfaces/user';
import Swal from 'sweetalert2';
import {Product} from '../../interfaces/product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  lastPage: number;
  IsSorted: Boolean;
  IsFirstSorted: boolean;
  type:string=Auth.user_type
  _search_string:string;
  paged: number;
  product_perm: any;

  constructor(
    private productService: ProductService,
    private router : Router,
    private active_route:ActivatedRoute) {
  }
  sortproducts(c:string,col:HTMLElement){
    console.log('executed sort');
    
    this.IsFirstSorted=true;
    console.log("sorting");
    if(!this.IsSorted){
      this.products=<Product[]>this.productService.sortArray(this.products,c)
      console.log(this.products);
      col.lastElementChild.classList.replace('fa-arrow-up','fa-arrow-down')
      console.log(col.lastElementChild.classList);
      
      this.IsSorted=true;
      }
      else{
        this.products=<Product[]>this.productService.reverseArray(this.products,c)
        col.lastElementChild.classList.replace('fa-arrow-down','fa-arrow-up')
        this.IsSorted=false
        console.log(col.lastElementChild.classList);
  }
  this.router.navigate([],{queryParams:{sort:c},queryParamsHandling:'merge'})
}



  ngOnInit(): void {
    this.active_route.queryParamMap.subscribe(
      (params:ParamMap)=> this.load(parseInt(params.get('page')))
      )
      this.product_perm = Auth.user.groups;

    
  }

  load(page = 1): void {
    this.productService.all(page).subscribe(
      (res) => {
        console.log(res);
        this.products = res.data;
        this.lastPage = res.meta.total_pages;
        this.IsFirstSorted=false; 
        console.log('found sort paramet',
        this.active_route.snapshot.paramMap,
        this.active_route.snapshot.paramMap.keys);
        if(this.active_route.snapshot.paramMap.has('sort'))
              {
                this.sortproducts(
                  this.active_route.snapshot.paramMap.get('sort'),
                  document.getElementById('title')
                  );
                }
            
            }

      ,(error:HttpErrorResponse)=>{
        if(error.status==403)
         Swal.fire(error.error['detail'],'','error')
          // this.router.navigate(['/forbiddent'])
      }
    );
  }
  delete(id: number): void {
    console.log("tuyf");
    
    this.productService.delete(id).then(
      (result_observable)=>{
        if(result_observable)
        {result_observable.subscribe(
          () =>{
                this.products = this.products.filter(p => p.id !== id);
                Swal.fire
                (
                  'Deleted!',
                  'product has been deleted.',
                  'success'
                )
              },(error:HttpErrorResponse)=>{
                if(error.status==403)
                 Swal.fire(error.error['detail'],'','error')
                  // this.router.navigate(['/forbiddent'])
              }
        );}
      })
  }
  
}

