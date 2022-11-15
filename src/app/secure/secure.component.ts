import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Auth} from '../classes/auth';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.user().subscribe(
      (user:User) => {

        Auth.user_type=user.type_name
        Auth.user = user;
        Auth.userEmitter.emit(user);
        
        this.user = user;
        if(!user.user_image)
        this.router.navigate(['/profile'])
      },
      () => this.router.navigate(['/login'])
    );
  }

}
