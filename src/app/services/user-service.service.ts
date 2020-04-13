import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';

const USERS = [
  {
    _id: 'Hs3775dmLbLCWwQdPq8s64Y3o',
    name: 'Ochoa Hyde',
    coins: 100,
    moves: [],
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users: User[];
  private loggedInUser: User;

  constructor(private storageService: StorageService) { 
    this.setUsers()
   }

  setUsers() {
    var users = this.storageService.getStore('users');
    if (!users || !users.length) {
      users = [];
      this.saveToStore(users);
    }
    this._users = users;
  }

  getUser(): User {
    const user = this._users.find((user) => user);
    this.loggedInUser = user;
    return user;
  }

  signup({ name }): void {
    const newUser = new User();
    newUser.name = name;
    newUser.setId();

    this._users.unshift(newUser);
    this.saveToStore(this._users);
  }

  addMove(contact, amount) {
    /////
  }

  saveToStore(value) {
    this.storageService.setStore('users', value);
  }
}
