import {Injectable} from '@angular/core';
import {RestService} from './rest.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends RestService {
  endpoint = `${environment.api}/orders/orders`;
  
  import(data:FormData){
    return this.http.post(`${this.endpoint}/import`, data)
    }
  export(): Observable<any> {
    return this.http.get(`${this.endpoint}/export`,{responseType: "blob"});
  }

  chart(): Observable<any> {
    let url=`${this.endpoint}/chart`;
    console.log(url);
    
    return this.http.get(url);
  }
}
