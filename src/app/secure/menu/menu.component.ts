import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/classes/auth';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  permissions_list :string[];
 

  constructor() { }

  ngOnInit(): void {
    Auth.userEmitter.subscribe((user:User) =>{
      this.permissions_list = user.groups;
      // console.log(this.permissions_list);
      
    })
    
  }

}
