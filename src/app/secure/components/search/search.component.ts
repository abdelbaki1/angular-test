import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() serachEmitter = new EventEmitter<string>()
  private _search_string: any;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  set search_string(s:string){
    this._search_string = s;
  
  }
  search(){
      console.log(this._search_string);
      // this.router.navigate(
      //   [],
      //   {queryParams:{'search':this._search_string,'page':1},
      //   queryParamsHandling: 'merge'
      //  }
      // );
      this.serachEmitter.emit(this._search_string)
    }
}
