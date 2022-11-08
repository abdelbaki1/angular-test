import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { last } from 'rxjs/operators';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit,OnChanges {
  @Input() lastPage: number; ;
  @Output() pageChanged = new EventEmitter<number>();
  page = 1;
  page_number:number =5;
  page_list:number[]=[];
  page_list_current:number[]
  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.prev()
    if(this.lastPage>1){
    for (var i = 0; i < this.lastPage; i++) {
      this.page_list.push(i+1);
    }
    // this.page_number=Math.round(this.lastPage/2);
    this.page_list_current=this.page_list.slice(this.page-1,this.page_number);
    if(this.lastPage<this.page_number)
        return;
    console.log("evkhk",this.page_list_current,this.page_list.slice(this.page_number,this.lastPage));
    
    if(this.page_list.slice(this.page_number,this.lastPage).length <=this.page_number)
     {
       console.log(this.page_list.slice(this.page_number-1,this.lastPage));
       
      this.page_list_current.pop()
      
      this.page_list_current=this.page_list_current.concat(this.page_list.slice(this.page_number-1,this.lastPage));
     }
  }
  console.log(this.page,this.page_list,this.page_list_current);
  }
  ngOnInit(): void {
    
  }

  next(number): void {
    
    if (number > this.lastPage || number < 1 || number == this.page) {
      return;
    }
    this.page=number;
    if(this.page==1)
        this.page_list_current=this.page_list.slice(this.page-1,this.page+this.page_number);
    this.pageChanged.emit(number);
    // if(this.page==this.lastPage)
    //         return;
    if(number==this.page_list_current[this.page_list_current.length -1 ])
       {
        if(this.page==this.lastPage)
            return;
        var slice:number[] = this.page_list.slice(this.page-1,this.page+this.page_number);
        if(this.lastPage - slice[slice.length-1 ] < this.page_number)
            slice=this.page_list.slice(this.page-1,this.lastPage);
        if(slice.length < this.page_number)
            { this.page_list_current.pop()
              this.page_list_current=this.page_list_current.concat(slice);

            }
        else
            this.page_list_current=slice;

      }
      

   
    

  }
}
