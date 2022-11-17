import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/classes/auth';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthUsersService implements CanLoad {

  constructor(private router:Router) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if( Auth.user_type =="admin")
    return true;
    else
    {this.router.navigate(['/home'])
       Swal.fire('you need to be super to do this','','error')
      return false }
    // return true;
      
  }
}
