import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Auth} from '../../classes/auth';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  infoForm: FormGroup |undefined;
  passwordForm: FormGroup;

  constructor(
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
    this.authService.updateInfo(this.infoForm.getRawValue()).subscribe(
      user => Auth.userEmitter.emit(user)
    );
  }

  passwordSubmit(): void {
    this.authService.updatePassword(this.passwordForm.getRawValue()).subscribe(
      res => console.log(res)
    );
  }
}
