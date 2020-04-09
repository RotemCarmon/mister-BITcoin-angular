import { Injectable } from '@angular/core';
import { User }  from '../models/user.model';
import { of } from 'rxjs/observable/of'
import { Observable } from 'rxjs';

const USERS = [
  {
    name: "Ochoa Hyde",
    coins: 100,
    moves: []
  }
]

@Injectable({
  providedIn: 'root'
})
export class UserService{
  
  private _users: User[] = USERS;

  constructor() { }
  getUser() {
    const user = this._users.find(user => user)
    return user;
  }
}
