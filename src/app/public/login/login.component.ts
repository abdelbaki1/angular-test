import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Auth } from 'src/app/classes/auth';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './../public.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  submit(): void {
    this.authService.login(this.form.getRawValue())
      .subscribe(() => {Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'welcom',
        showConfirmButton: false,
        timer: 1500
      });this.router.navigate(['/'])}
      ,(error:HttpErrorResponse)=>{Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">if you hav nt Registered yet! please sign up before login in</a>'
      })});
  }
}
