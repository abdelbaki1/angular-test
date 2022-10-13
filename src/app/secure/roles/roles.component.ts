import {Component, OnInit} from '@angular/core';
import {RoleService} from '../../services/role.service';
import {Role} from '../../interfaces/role';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  last_page:number;

  constructor(private roleService: RoleService) {
  }
  load(page=1){
    this.roleService.all(page).subscribe(
      roles =>{
        this.last_page=roles.meta.total_pages
        this.roles = roles.data;
        console.log("last_page",this.last_page);     
      }
    );
  }
  ngOnInit(): void {
    this.load()
    
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.roleService.delete(id).subscribe(
        () => this.roles = this.roles.filter(r => r.id !== id)
      );
    }
  }

}
