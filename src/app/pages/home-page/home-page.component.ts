import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin-service.service';
import { Move } from 'src/app/models/move.model';


@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  user: User = null;
  rate: number;
  USD: number;
  movesToShow: Move[];
  general = true;
  

  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService,
   
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getRate();
    this.getMovesToShow();
  
  }

  getUser() {
    this.user = this.userService.getUser();
  }
  getMovesToShow() {
    this.movesToShow = this.user.moves.slice(0, 3);
  }

  async getRate() {
    var rate: number = JSON.parse(localStorage.getItem('rate'));
    if (!rate) {
      const prm = await this.bitcoinService.getRate();

      rate = prm.data;
      localStorage.setItem('rate', JSON.stringify(rate));
    }
    this.rate = rate;
    this.USD = (1 / this.rate) * this.user.coins;
  }
  
}
