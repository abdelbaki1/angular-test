import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup;
  url_image:string=`${environment.server_url}/upload`
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['',[Validators.required]],
      description: ['',[Validators.required]],
      image: '',
      price: ['',[Validators.required]]
    });
  }
  get image(){
    return this.form.get('image');
  }
   get title(){
     return this.form.get('title');
   }
   get description(){
    return this.form.get('description');
  }
  get price(){
    return this.form.get('price');
  }
  submit(): void {
    this.productService.create(this.form.getRawValue())
    .then((result_obs)=>{
      if(result_obs){
        result_obs.subscribe(
          () => this.router.navigate(['/products']))
        }
        else{
          Swal.fire('there was an error while creating user object')
          this.router.navigate(['/products']);
          
        }
        }
    ) 
  }
}
