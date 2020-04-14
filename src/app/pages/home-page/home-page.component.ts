import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user.model';
import { BitcoinService } from 'src/app/services/bitcoin-service.service';
import { Move } from 'src/app/models/move.model';
import { DatePipe } from '@angular/common';

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
  movesChart: any;

  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getRate();
    this.getMovesToShow();
    this.setChartData();
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
  setChartData(): void {
     
    const chart = {
      type: 'LineChart',
      data: this.user.moves.map<Array<any>>((move) => {
        var at = this.datePipe.transform(move.at , 'MMM d, y')
        return [at, move.amount]
      }),
      title: 'Moves history',
      options: {
        legend: { position: 'none' },
        backgroundColor: {
          fill: 'rgb(41, 41, 66)',
        },
        colors: ['#E88C30'],
        titleTextStyle: { color: '#FFF', fontSize: 14 },
        vAxis: {
          textStyle: { color: '#8089A4' },
        },
        hAxis: {
          format: 'short',
          textStyle: { color: '#8089A4' },
        },
        chartArea:{ width:'84%', height:'65%'},
        curveType:'function'
      },
    };
    this.movesChart = chart;
    
  }
}
