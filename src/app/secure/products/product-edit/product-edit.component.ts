import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  url_edit :string =`${environment.server_url}/upload`
  form: FormGroup;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['',[Validators.required]],
      description: ['',[Validators.required]],
      image: '',
      price: ['',[Validators.required]]
    });

    this.id = this.route.snapshot.params.id;

    this.productService.get(this.id).subscribe(
      product => {
       this.form.patchValue(product)
       
      },(error:HttpErrorResponse)=>{
        if(error.status==403)
         Swal.fire(error.error['detail'],'','error')
          this.router.navigate(['/home'])
      }
    );
  }
  get image(){
    return this.form.get('image').value
  }

  submit(): void {
    this.productService.update(this.id, this.form.getRawValue())
    .then(
      (obs)=>{
        if(!obs)this.router.navigate(['/products']);
        else
          {
          obs.subscribe(
            ()=>this.router.navigate(['/products'])
            ,(error:HttpErrorResponse) => {
                Swal.fire(error.statusText,error.error['detail'],'error')
            this.router.navigate(['/orders']);
            }
            )
          }
        })
        
  }
}
