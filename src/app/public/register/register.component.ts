import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './../public.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup;
  constructor(
    private router : Router,
    private authService: AuthService,
    private Form : FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.Form.group({
      first_name : [''],
      last_name : [''],
      email :[''],
      password : [''],
      password_confirm : [''],
      group_name:[null,Validators.required],
      
    })
  }
  get group_name(){
    return this.form.get('group_name')
  }

  submit(): void {
    console.log(this.form.getRawValue());
    this.authService.register(
      this.form.getRawValue()
    ).subscribe(() => {Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'registered succefuly',
      showConfirmButton: false,
      timer: 1500
    });this.router.navigate(['/login'])}
    ,(err:HttpErrorResponse)=>{Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Hvaing a Problem ? Try to Login</a>'
    })});
    
  }

}
