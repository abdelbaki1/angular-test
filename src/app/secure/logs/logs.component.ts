import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs_list:any[]=[]
  lastpage:number
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getlog(1)
  }
getlog(n:number){
  this.http.get('http://127.0.0.1:8000/api/users/log?page='+n.toString()).subscribe(
    {next:(response:any)=>{this.logs_list=response.data;this.lastpage=response.meta.total_pages}}
    )
}

}
