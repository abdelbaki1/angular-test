import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  form: FormGroup;

  url_image:string=`${environment.server_url}/upload`
  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
    first_name: ['',[Validators.required]],
    last_name: ['',[Validators.required]],
     order_items : this.formBuilder.array([]),
    
      email: ['',[Validators.required]]
    });
  }

   get first_name(){
     return this.form.get('first_name');
   }
   get last_name(){
    return this.form.get('last_name');
  }
  get email(){
    return this.form.get('email');
  }
  get order_items() : FormArray {
    return this.form.get("order_items") as FormArray
  }
  submit(): void {
    this.orderService.create(this.form.getRawValue())
    .then((result_obs)=>{
      if(result_obs){
        result_obs.subscribe(
          () => this.router.navigate(['/orders']),
          (error:HttpErrorResponse) => {
            if(error.status == 403)
            {
              Swal.fire(error.statusText,error.error['detail'])
          this.router.navigate(['/orders']);
            }
          }
          )
        }
        else{
          Swal.fire('there was an error while creating order object')
          this.router.navigate(['/orders']);
          
        }
        }
    ) 
  }

}
