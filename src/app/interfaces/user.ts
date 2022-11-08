import { SafeUrl } from '@angular/platform-browser';
import {Role} from './role';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  user_image:string;
}
