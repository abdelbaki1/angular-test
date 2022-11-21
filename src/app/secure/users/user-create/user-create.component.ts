import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoleService} from '../../../services/role.service';
import {Role} from '../../../interfaces/role';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  form: FormGroup;
  roles: Role[] = [];
  page_num: any;
  selectedCityId :string;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private router: Router,
    private http : HttpClient
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
  addrole(value:Role){
    //  console.log(value);
    this.form.patchValue({'role_id':value.id})

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
      }
  getlist(){
    this.http.get(environment.api+ '/users/unpagenatedroles').subscribe(

      (roles:any) => {
        this.roles = roles
         console.log(this.roles,environment.api+ '/users/unpagenatedroles');
      }

      
    );

  }


  submit(): void {
    console.log(this.form.getRawValue(),this.form);
    this.userService.create(this.form.getRawValue()).then((result_obs)=>{
    if(result_obs){
        Swal.fire('user added successfully','','success');
        result_obs.subscribe(

          () => this.router.navigate(['/users']),
          (error:HttpErrorResponse) => {
            if(error.status == 403)
            {
              Swal.fire(error.statusText,error.error['detail'],'error')
          this.router.navigate(['/orders']);
            }
          })
        }
    else{
          Swal.fire('there was an error while creating user object')
          this.router.navigate(['/users'])
        }
        }
          );
  }

}
