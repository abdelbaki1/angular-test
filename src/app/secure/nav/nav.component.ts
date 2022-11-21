import {Component, Input, OnInit, SecurityContext} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../interfaces/user';
import {Auth} from '../../classes/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: User=null;
  image:SafeUrl;

  constructor(private router:Router,private authService: AuthService,private sanitizer:DomSanitizer) {
  }

  ngOnInit(): void {
    Auth.userEmitter.subscribe((user:User) =>{

    this.user = user
    user.user_image ? this.image= this.sanitizer.bypassSecurityTrustUrl(user.user_image) : this.image = null
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
