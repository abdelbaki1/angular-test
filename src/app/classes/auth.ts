import {EventEmitter} from '@angular/core';
import {User} from '../interfaces/user';

export class Auth {
  static userEmitter = new EventEmitter<User>();
  private static _user: User;
  private static _type_name:string;

  static set user(user:User){
    this._user=user;
    this._user.groups = user.groups[0].permissions.map(permission =>
       {return permission.codename})
    
    this.userEmitter.emit(user)
  }
  static get user():User{
    return this._user
  }
  static get user_type(){
    return this._type_name
  }
  static set user_type(type:string){
    this._type_name=type 
  }
  

}
