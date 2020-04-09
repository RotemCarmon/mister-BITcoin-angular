import { Component, OnInit } from '@angular/core';
import { BitcoinService } from 'src/app/services/bitcoin-service.service';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss'],
})
export class StatisticPageComponent implements OnInit {
  marketChartType = 'AreaChart';
  marketChartData: any[] = [];
  marketChartName: string;

  tradeChartType = 'LineChart';
  tradeChartData: any[] = [];
  tradeChartName: string;
  
  transactionChartType = 'LineChart';
  transactionChartData: any[] = [];
  transactionChartName: string;

  chartOption: any = {
    legend: { position: 'none' },
    vAxis:  { format: 'short' }
  };

  constructor(
    private bitcoinService: BitcoinService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit(): void {
    this.getMarketPrice();
    this.getTradeVolume();
    this.getConfirmedTransactions();
  }

  async getMarketPrice() {
    var marketPrice: any = JSON.parse(localStorage.getItem('marketPrice'));

    if (!marketPrice) {
      const prm = await this.bitcoinService.getMarketPrice();
      marketPrice = prm.data;
      localStorage.setItem('marketPrice', JSON.stringify(marketPrice));
    }

    this.marketChartName = marketPrice.name;
    this.marketChartData = marketPrice.values.map((value) => {
      value.x = this.datePipe.transform(value.x * 1000, 'dd-MM-yyyy');
      return Object.values(value);
    });
  }

  async getTradeVolume() {
    var tradeVolume: any = JSON.parse(localStorage.getItem('tradeVolume'));

    if (!tradeVolume) {
      const prm = await this.bitcoinService.getTradeVolume();
      tradeVolume = prm.data;
      console.log('tradeVolume', tradeVolume);
      localStorage.setItem('tradeVolume', JSON.stringify(tradeVolume));
    }

    this.tradeChartName = tradeVolume.name;
    this.tradeChartData = tradeVolume.values.map((value) => {
      value.x = this.datePipe.transform(value.x * 1000, 'dd-MM-yyyy');
      return Object.values(value);
    });
  }

  async getConfirmedTransactions() {
    var confirmedTransactions: any = JSON.parse(localStorage.getItem('confirmedTransactions'));

    if (!confirmedTransactions) {
      const prm = await this.bitcoinService.getConfirmedTransactions();
      confirmedTransactions = prm.data;
      console.log('confirmedTransactions', confirmedTransactions);
      localStorage.setItem('confirmedTransactions', JSON.stringify(confirmedTransactions));
    }

    this.transactionChartName = confirmedTransactions.name;
    this.transactionChartData = confirmedTransactions.values.map((value) => {
      value.x = this.datePipe.transform(value.x * 1000, 'dd-MM-yyyy');
      return Object.values(value);
    });
  }
}
