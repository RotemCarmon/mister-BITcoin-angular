import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  @Output() setPage = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  togglePages(page) {
    this.setPage.emit(page)
  }
}
