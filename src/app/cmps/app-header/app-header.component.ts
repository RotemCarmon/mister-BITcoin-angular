import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  isShowNavbar = false;
  faBars = faBars;
  
  constructor() { }

  toggleNavbar(): void {
    this.isShowNavbar = !this.isShowNavbar;
  }
  ngOnInit(): void {
  }
}
