import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {

  constructor() { }

  async getRate():Promise<AxiosResponse<any>>{
      const  rate = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1');
      return rate;
    }
    
    async getMarketPrice() : Promise<AxiosResponse<any>> {
    const marketPrice = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5days&format=json&cors=true');
    return marketPrice
  }
}
