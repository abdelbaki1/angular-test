import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  lastPage: number;
  IsSorted:Boolean = false;
is_sort_column={'email':false,'first_name':false};


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.load();
  }

  load(page = 1): void {
    this.userService.all(page).subscribe(
      (res: any) => {
        console.log(res);

        console.log(res.data);
        this.users = res.data;
        this.lastPage = res.meta.total_pages;
        console.log(this.is_sort_column['first_name']);
      }
    );
    

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
                  }
            );}
          })
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

  }
}