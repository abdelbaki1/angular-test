import {Component, OnInit} from '@angular/core';
import {RoleService} from '../../services/role.service';
import {Role} from '../../interfaces/role';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  last_page:number;
  IsSorted: Boolean=false;
  IsFirstSorted:Boolean=false;

  constructor(private roleService: RoleService) {
  }
  load(page=1){
    this.roleService.all(page).subscribe(
      roles =>{
        // console.log(this.roles,this.roles[0].getAttribute('id'));
        
        this.last_page=roles.meta.total_pages
        this.roles = roles.data;
        // console.log("last_page",this.last_page);    
        this.IsFirstSorted=false; 
      }
    );
  }
  ngOnInit(): void {
    this.load()
    
  }

  delete(id: number): void {
    this.roleService.delete(id).then(
      (result_observable)=>{
        if(result_observable)
        {result_observable.subscribe(
          () =>{
                this.roles = this.roles.filter(r => r.id !== id)
                Swal.fire
                (
                  'Deleted!',
                  'Role has been deleted.',
                  'success'
                )
              },
          (error:HttpErrorResponse) => {
            if(error.status == 403)
            {
              Swal.fire(error.statusText,error.error['detail'],'error')
            }
          }
        );}
      })
  }
  sortroles(c:string,col:HTMLElement){
    this.IsFirstSorted=true;
    console.log("sorting");
    if(!this.IsSorted){
      this.roles=<Role[]>this.roleService.sortArray(this.roles,c)
      console.log(this.roles);
      col.lastElementChild.classList.replace('fa-arrow-up','fa-arrow-down')
      console.log(col.lastElementChild.classList);
     
      this.IsSorted=true;
      }
      else{
        this.roles=<Role[]>this.roleService.reverseArray(this.roles,c)
        col.lastElementChild.classList.replace('fa-arrow-down','fa-arrow-up')
        this.IsSorted=false
        console.log(col.lastElementChild.classList);
  
    
  }
}
}
