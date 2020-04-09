import { Component, OnInit } from '@angular/core';
import { BitcoinService } from 'src/app/services/bitcoin-service.service';
import { DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})
export class StatisticPageComponent implements OnInit {
  
  marketChartType = 'AreaChart';
  marketChartData: any[] = [];
  marketChartName: string;
  constructor(
    private bitcoinService: BitcoinService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.getMarketPrice()
  }

  async getMarketPrice() {
    var marketPrice: any = JSON.parse(localStorage.getItem('marketPrice'))
    if(!marketPrice) {
      const prm = await this.bitcoinService.getMarketPrice();
      marketPrice = prm.data;
      localStorage.setItem('marketPrice', JSON.stringify(marketPrice))
    }
    
    this.marketChartName = marketPrice.name
    this.marketChartData = marketPrice.values.map(value => {
      value.x = this.datePipe.transform((value.x * 1000), 'dd-MM-yyyy')
      return Object.values(value);
    })
  }
}
