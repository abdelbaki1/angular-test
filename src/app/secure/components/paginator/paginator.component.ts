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
  page :number;
  page_number:number =3;;
  page_list:number[]=[];
  page_list_current:number[];
  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.prev()
    if(this.lastPage>1){
      if(this.lastPage<=this.page_number)
          this.page_number=this.lastPage;
      
    // for (var i = 0; i < this.page_number; i++) {
    //   this.page_list_current.push(i+1);
    // }
    
    // this.page_number=Math.round(this.lastPage/2);
    // if(this.lastPage<this.page_number)
    //     return;
    // console.log("evkhk",this.page_list_current,this.page_list.slice(this.page_number,this.lastPage));
    
    // if(this.page_list.slice(this.page_number,this.lastPage).length <=this.page_number)
    //  {
    //    console.log(this.page_list.slice(this.page_number-1,this.lastPage));
       
    //   this.page_list_current.pop()
      
    //   this.page_list_current=this.page_list_current.concat(this.page_list.slice(this.page_number-1,this.lastPage));
    //  }
    this.next(1)
  }
  console.log(this.page_number,this.lastPage,this.page_list_current);
 
  }
  ngOnInit(): void {
    

    
    
  }
  async changePaginator(number:number){
    if(this.page==number || number >this.lastPage || number <=0)
       return;
    this.page=number;
    this.page_list_current=[];
    var i :number = number;
    var j = Math.round(number - (this.page_number/2));
    while(j<number)
    {
      console.log("j=",j);
      if(j>0)
      this.page_list_current.push(j)
      j++;
    }
    if(this.page_list_current[0] <=this.page_number)
    {
      var k = this.page_list_current[0]-1
      while(k>0 )
      {
        this.page_list_current.unshift(k);
        k--;
      }
    }
    while(i<this.page_number+number)
    {
      this.page_list_current.push(i)
      if(i==this.lastPage)
         break;
      i++;
    }
    if(this.lastPage - this.page_list_current[this.page_list_current.length -1] <this.page_number)
    {
      var k = this.page_list_current[this.page_list_current.length -1]+1
      while(k <= this.lastPage )
      {
        this.page_list_current.push(k)
        k++;
      }
    }

  }
  async next(number : number,ul?:HTMLElement): Promise<void> {
    await this.changePaginator(number);
    ul.getElementsByClassName("active")[0]?.classList.remove("active");
    document.getElementById(this.page.toString()).classList.add("active")
    console.log(this.page,this.page_list_current,document.getElementById(this.page.toString()).classList);
    this.pageChanged.emit(number);
  }
 

    //while loop for incressing number of page
       //if we hit the last page we elimate the .. and the last page
    //while loop for decreassing number of page
       // if we hit the negative value we stop

  
}