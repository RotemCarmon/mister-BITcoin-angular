import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mister-BITcoin';
  isShowing: string = 'home';

  togglePages(page) {
    this.isShowing = page;
  }
}
