import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/classes/auth';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  type :string;
 

  constructor() { }

  ngOnInit(): void {
    Auth.userEmitter.subscribe((user:User) =>{
      this.type = user.type_name
    })
    console.log(this.type);
    
  }

}
