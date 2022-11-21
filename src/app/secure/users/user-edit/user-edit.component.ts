import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Role} from '../../../interfaces/role';
import {RoleService} from '../../../services/role.service';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Alerts } from 'src/app/classes/Alerts';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  form: FormGroup;
  roles: Role[] = [];
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private http : HttpClient
  ) {
  }
  // ngOnDestroy(): void {
  //   Swal.fire('Changes are not saved', '<a>hi</a>', 'info')!
    
  // }

  ngOnInit(): void {
    this.getlist();
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      role_id: ''
    });

    // this.roleService.all().subscribe(
    //   roles =>{console.log(roles);
    //    this.roles = roles.data}
    // );

    this.id = this.route.snapshot.params.id;

    this.userService.get(this.id).subscribe(
      user => {
        console.log(user);
        
        this.form.patchValue({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          });
        if(user.groups)
            this.form.patchValue({role_id: user.groups[0].id})
        
      },
      (e:HttpErrorResponse) =>{if(e.status==403){Swal.fire(e.statusText,e.error['detail'],'error');this.router.navigate(['/dashboard'])}}
    );
  }
  getlist(){

    this.http.get(environment.api+ '/users/unpagenatedroles').subscribe(

      (roles:any) => {
        this.roles = roles
        // this.roles.map((role:Role)=>{
        //   if(role.id == this.form.get('role_id').value)
        //       ht.select(role.id)
        //       //  role['disabled']=true;
        // })
        //  console.log(this.roles,environment.api+ '/users/unpagenatedroles');
      }

      
    );
    

  }
  submit(): void {
    console.log(this.form.getRawValue());
    this.userService.update(this.id,this.form.getRawValue())
                    .then(
                      (obs)=>{if(!obs)this.router.navigate(['/users']);
                      else{
                        Swal.fire('user edited successfully','','success');
                      obs.subscribe(
                        
                        ()=>this.router.navigate(['/users']))
                      }
                    }
                        )

  }

}
