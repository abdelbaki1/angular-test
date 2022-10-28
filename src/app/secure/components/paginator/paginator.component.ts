import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit,OnChanges {
  @Input() lastPage: number ;
  @Output() pageChanged = new EventEmitter<number>();
  page = 1;
  page_list=[]
  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.prev()
    if(this.lastPage>1){
    for (var i = 0; i < this.lastPage; i++) {
      this.page_list.push(i+1);
    }
  }
  }
  ngOnInit(): void {
  }

  next(number): void {
    if (number > this.lastPage || number < 1 || number == this.page) {
      return;
    }
    this.page=number;
    this.pageChanged.emit(number);
  }
}
