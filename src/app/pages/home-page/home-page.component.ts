import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin-service.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  user: User = null;
  rate: any;
  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getRate();
  }

  getUser() {
    this.user = this.userService.getUser();
  }
  async getRate() {
    let prm = await this.bitcoinService.getRate();
    this.rate = prm.data;
  }
}
