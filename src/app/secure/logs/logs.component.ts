import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs_list:any[]=[]
  lastpage:number
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.getlog(1)
  }
getlog(n:number){
  this.http.get('http://127.0.0.1:8000/api/users/log?page='+n.toString()).subscribe(
    {
      next:(response:any)=>{this.logs_list=response.data;this.lastpage=response.meta.total_pages}
      ,error:(error:HttpErrorResponse) => {
            if(error.status == 403)
                {
                 Swal.fire(error.statusText,error.error['detail'])
                  this.router.navigate(['/home']);
                  }
                                            }
    });
}

}
