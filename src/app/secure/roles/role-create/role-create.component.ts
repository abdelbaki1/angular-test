import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Permission} from '../../../interfaces/permission';
import {PermissionService} from '../../../services/permission.service';
import {RoleService} from '../../../services/role.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {
  form: FormGroup;
  permissions: Permission[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['',[Validators.required]],
      permissions: this.formBuilder.array([])
    });

    this.permissionService.all().subscribe(
      permissions => {
        this.permissions = permissions;
        this.permissions.forEach(p => {
          this.permissionArray.push(
            this.formBuilder.group({
              value: false,
              id: p.id
            })
          );
        });
      }
    );
    console.log(this.permissionArray,this.permissions);
    
  }

  get permissionArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }
  get name ()
  {return this.form.get('name')}

  submit(): void {
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
      permissions: formData.permissions.filter(p => p.value === true).map(p => p.id)
    };

    this.roleService.create(data).then(
      (result_obs)=>
      {if(result_obs){
        result_obs.subscribe(
          () => this.router.navigate(['/roles'])
          ,(error:HttpErrorResponse) => {
            if(error.status == 403)
            {
              Swal.fire(error.statusText,error.error['detail'],'error')
          this.router.navigate(['/orders']);
            }
          }
          )
        }
        else{
          Swal.fire('there was an error while creating role object')
          this.router.navigate(['/roles'])
        };
  }
    )
}
  
}
