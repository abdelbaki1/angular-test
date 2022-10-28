import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export abstract class RestService {

  abstract get endpoint(): string;

  constructor(protected http: HttpClient) {
  }

  all(page?: number): Observable<any> {
    let url = this.endpoint;

    if (page) {
      url += `?page=${page}`;
    }

    return this.http.get(url);
  }

  create(data): Promise<Observable<any>> {
   return Swal.fire({
      title: 'Are you sure to create this?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, create it!'
    }).then((result) => {
      if (result.isConfirmed) {
        return this.http.post(this.endpoint+"/create", data);
        
      }
    }) 
  }
  get(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/${id}`);
  }

  update(id: number, data): Promise<Observable<any>> {
     return Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
         return this.http.put(`${this.endpoint}/${id}`, data);}
         else if (result.isDenied) {
           console.log('denied');
           
        Swal.fire('Changes are not saved', '', 'info')
        //  return undefined
      }
    })
    
  }

  delete(id: number): Promise<Observable<void>> {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        return this.http.delete<void>(`${this.endpoint}/${id}`);  
      }
    })
  }
  sortArray(array:any[],critier:string){
    return array.sort(
      (obj1:User,obj2)=> obj1[critier].localeCompare(obj2[critier])
      )
  }
  reverseArray(array:any[],critier:string)
  {
    return array.sort(
      (obj1,obj2)=> obj2[critier].localeCompare(obj1[critier])
      )
  }
}
