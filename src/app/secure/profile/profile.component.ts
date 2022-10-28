import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Auth} from '../../classes/auth';
import { User } from 'src/app/interfaces/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  infoForm: FormGroup |undefined;
  passwordForm: FormGroup;
  url_upload=''
  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    Auth.userEmitter.subscribe(
      (user1:User) => {
        console.log("**************");
        this.infoForm?.patchValue(user1);
        
        
      
      },
      err=>console.log(err)
      
    );
  }

  ngOnInit(): void {
    console.log("profile");
    const user:User = Auth.user;
    console.log(user);
    this.infoForm = this.formBuilder.group({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    });

    this.passwordForm = this.formBuilder.group({
      password: '',
      password_confirm: ''
    });
    // this.infoForm?.patchValue(user);
  }
  infoSubmit(): void {
    this.authService.updateInfo(this.infoForm.getRawValue()).then(
      (user_obs)=>
        {if(!user_obs)Swal.fire('there was an error while changing','','error');
        else{
        user_obs.subscribe(
          {next:(user)=> {
            Swal.fire('USER DETAIL CHANGED','','info')
            Auth.userEmitter.emit(user);this.router.navigate(['/dashboard'])}}
          )
        }
      
      }
    )
  }

  passwordSubmit(): void {
    this.authService.updatePassword(this.passwordForm.getRawValue())
    .then(
      (user_obs)=>
        {if(!user_obs)Swal.fire('there been an error while changing','','error');
        else{
        user_obs.subscribe(
          {next:(user)=> {
            Swal.fire('Password changed ','','info')
            Auth.userEmitter.emit(user);this.router.navigate(['/login'])}}
          )
        }
      
      }
    )
  }
}
