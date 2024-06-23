import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { users } from './utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private data$ = new BehaviorSubject(users);

  // expose Observable
  data = this.data$.asObservable();

}
