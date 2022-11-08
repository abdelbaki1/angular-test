import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(protected http: HttpClient) {
  }

  login(data): Observable<any> {
    return this.http.post(`${environment.api}/users/login`, data);
  }

  register(data): Observable<User> {
    return this.http.post<User>(`${environment.api}/users/register`, data);
  }

  user() {
    return this.http.get(`${environment.api}/users/user`);
  }

  logout(): Promise<Observable<void>> {
    return Swal.fire({
      title: 'Do you want to Logout?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, LOG ME OUT',

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        return this.http.post<void>(`${environment.api}/users/logout`, {});
      }
         else if (result.isDenied) {
           console.log('denied');
         return undefined}
      }
    )
    
  }

  updateInfo(data): Promise<Observable<User>> {
    return Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        return this.http.patch<User>(`${environment.api}/users/users/info`, data);}
         else if (result.isDenied) {
           console.log('denied');
         return undefined
      }
    })
    
  }

  updatePassword(data): Promise<Observable<User>> {
    
    return Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        return this.http.put<User>(`${environment.api}/users/users/password`, data)}
         else if (result.isDenied) {
           console.log('denied');
         return undefined
      }
    })
  }
}
