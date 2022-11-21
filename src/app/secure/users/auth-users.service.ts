import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/classes/auth';
import { User } from 'src/app/interfaces/user';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthUsersService implements CanLoad {
   value :boolean = false;

  constructor(private router:Router) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if( Auth.user?.type_name.startsWith("admin"))
          this.value = true;
      else
      { this.router.navigate(['/home'])
        // Swal.fire('you need to be super to do this','','error')
        this.value = false
      }
    // console.log(this.value);
    return this.value;
    // return true;
}
}
