import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, ActivationStart, ChildActivationStart, Event, Router} from '@angular/router';
import {Auth} from '../classes/auth';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit,OnChanges {
  user: User;
  path_url: string[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private activated_route :ActivatedRoute
  ) {
 
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(
      this.activated_route.pathFromRoot,this.activated_route)
    console.log(changes);
  }
  navigate(index:number){
    var i=0;
    var st =[]
    while(i<=index){
      st.push(this.path_url[i])
      i++;
    }
    this.router.navigate(st)
    console.log(st,this.path_url,index);
  }

  ngOnInit(): void {
    
    this.path_url = this.router.url.split('/')
    .filter((url => url!='')).map(url=>url.split('?')[0]);
    console.log(
      
      this.path_url)
      // this.path_name= this.activated_route.firstChild.snapshot.url[0].path
      // console.log(this.path_name);
      this.router.events.subscribe(
        (e:Event)=>{
          this.path_url=this.router.url.split('/').filter(
            (url)=>url!=''
            ).map(url=>url.split('?')[0]);
          
          // console.log(this.path_url);
        })
    this.authService.user().subscribe(
      (user:User) => {
        console.log(user);
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
