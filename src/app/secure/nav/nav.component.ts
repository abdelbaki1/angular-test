import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../interfaces/user';
import {Auth} from '../../classes/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: User=null;

  constructor(private router:Router,private authService: AuthService) {
  }

  ngOnInit(): void {
    Auth.userEmitter.subscribe((user:User) =>{
    // console.log(user);
    
     this.user = user
     ;
    
    });
  }

  logout(): void {
    
    this.authService.logout().then(
      (result_observable)=>{
        result_observable.subscribe
        (
          () =>{
                this.router.navigate(['/login'])
                Swal.fire
                (
                  'user has been Logut',
                  'success'
                )
              }
        );
      })
  }
}
