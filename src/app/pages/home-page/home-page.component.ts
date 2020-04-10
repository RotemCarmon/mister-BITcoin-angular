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
  USD: string;
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
    var rate: any = JSON.parse(localStorage.getItem('rate'));
    
    if (!rate) {
      const prm = await this.bitcoinService.getRate();
      rate = prm.data;
      localStorage.setItem('rate', JSON.stringify(rate));
    }
    
    this.USD = `$${((1/ this.rate ) * this.user.coins).toFixed(2)}`;
  }
}
