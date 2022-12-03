import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Auth } from 'src/app/classes/auth';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filters:User[]=[]
  lastPage: number;
  IsSorted:Boolean = false;
  is_sort_column={'email':false,'first_name':false};
  _search = '';
  user_perm: string[];
  role_list : any[];

set search(s:string){
  this._search = s ;

}
  constructor(private userService: UserService,
    private active_route :ActivatedRoute,
    private router:Router) {
  }

   ngOnInit(): void {
    console.log(
      this.active_route.pathFromRoot)
    this.user_perm = Auth.user.groups.filter(
      (role_string:string)=>role_string.endsWith('user'))
    this.load(1);

  }
  filter(value){
    console.log(value);
    if(value)
    {this.filters=this.users.filter(
      (user:User)=>user.groups[0].name==value
    )}
    else{
      this.filters=this.users
    }
    console.log(this.filters);

    
    }
  getfilter(){
    this.role_list= Array.from(new Set( this.role_list))
    console.log(this.role_list);
    
  }
  load(page:number): void {
            this.userService.all(page,this._search).subscribe(
              (res: any) => {
                // console.log(res);
                // console.log(res.data);
                this.users = res.data;
                this.filters=this.users;
                this.lastPage = res.meta.total_pages;
                // console.log(this.is_sort_column['first_name']);
                this.role_list = this.users.map(
                  (user : User)=>user.groups[0].name)
                  console.log(this.users);
                  
              }
            )
          }
  delete(id: number): void {
        this.userService.delete(id).then(
          (result_observable)=>{
            if(result_observable)
        {    result_observable.subscribe(
              () =>{
                    this.users = this.users.filter(u => u.id !== id);
                    Swal.fire
                    (
                      'Deleted!',
                      'user has been deleted.',
                      'success'
                    )
                  },
                  (e:HttpErrorResponse) =>
                  {if(e.status==403)
                    {Swal.fire(e.statusText,e.error['detail'],'error')}}
                
            )}
          })
          this.filters=this.users
      }
  sortObject(critiera:string,col:HTMLElement){
    this.is_sort_column={'email':false,'first_name':false};
    this.is_sort_column[critiera]=!this.is_sort_column[critiera]
    if(!this.IsSorted){
    this.users=this.userService.sortArray(this.users,critiera)
    // console.log(this.users);
    col.lastElementChild.classList.replace('fa-arrow-up','fa-arrow-down')
    // console.log(col.lastElementChild.classList);
    this.IsSorted=true;
    }
    else{
      this.users=this.userService.reverseArray(this.users,critiera)
      col.lastElementChild.classList.replace('fa-arrow-down','fa-arrow-up')
      this.IsSorted=false
    }
    this.router.navigate([],{queryParams:{sort:critiera},queryParamsHandling:'merge'})

  }
}