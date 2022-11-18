import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Role} from '../../../interfaces/role';
import {RoleService} from '../../../services/role.service';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { Alerts } from 'src/app/classes/Alerts';
import { HttpErrorResponse } from '@angular/common/http';

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
    private route: ActivatedRoute
  ) {
  }
  // ngOnDestroy(): void {
  //   Swal.fire('Changes are not saved', '<a>hi</a>', 'info')!
    
  // }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      role_id: ''
    });

    this.roleService.all().subscribe(
      roles =>{console.log(roles);
       this.roles = roles.data}
    );

    this.id = this.route.snapshot.params.id;

    this.userService.get(this.id).subscribe(
      user => {
        this.form.patchValue({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          
            
        });
        if(user.groups)
        {this.form.patchValue({role_id: user.groups[0].id}),console.log(this.form);
        }
      },(e:HttpErrorResponse) =>{if(e.status==403){Swal.fire(e.statusText,e.error['detail'],'error');this.router.navigate(['/dashboard'])}}
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
