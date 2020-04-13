import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setStore(key :string, value: any) :void {
    localStorage.setItem(key,JSON.stringify(value))
  }
  getStore(key :string) :Array<any> {
    return JSON.parse(localStorage.getItem(key))
  }

}
