import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';
import { Contact } from '../models/contact.model';
import { Move } from '../models/move.model';

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

  setUsers(): void {
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
  
  addMove(contact: Contact, amount: number) {
    const newMove = new Move (
      contact._id,
      contact.name,
      Date.now(),
      amount
      );
      
      const user = this._getUserById(this.loggedInUser._id)
      const userIdx = this._getUserIdX(this.loggedInUser._id)
      
      user.moves.unshift(newMove);
      user.coins = user.coins - amount
      
      this._users.splice(userIdx, 1, user)      
      this.saveToStore(this._users)
      
    }

  saveToStore(value: any[]): void {
    this.storageService.setStore('users', value);
  }
  _getUserById(userId : string): User{
    const user = this._users.find(user => user._id === userId) 
    return user
  }
  _getUserIdX(userId: string): number{
    const idx = this._users.findIndex(user => user._id === userId)
    return idx 
  }
}
