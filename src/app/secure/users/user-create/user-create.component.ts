import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleService} from '../../../services/role.service';
import {Role} from '../../../interfaces/role';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  form: FormGroup;
  roles: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private router: Router
  ) {
  }
  get first_name() {
    return this.form.get('first_name');
    
  }
 
  get last_name() {
    return this.form.get('last_name');
  }
  get password()
  {
    return this.form.get('password')
  }
  get email() {
    return this.form.get('email');
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: ['',[Validators.required]],
      last_name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      role_id: '',
      password:['',[Validators.required]]
    }
    );
    
    this.roleService.all().subscribe(

      (roles:any) => this.roles = roles.data
    );
  }


  submit(): void {
    console.log(this.form.getRawValue(),this.form);
    this.userService.create(this.form.getRawValue()).then((result_obs)=>{
    if(result_obs){
        Swal.fire('user added successfully','','success');
        result_obs.subscribe(

          () => this.router.navigate(['/users']))
        }
    else{
          Swal.fire('there was an error while creating user object')
          this.router.navigate(['/users'])
        }
        }
          );
  }

}
