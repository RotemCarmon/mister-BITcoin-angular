import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';



@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss']
})
export class TransferFundComponent implements OnInit {
  @Input() contact: Contact;
  @Input() maxCoins: number;
  @Output() handleTransfer = new EventEmitter();
  amount: number;
  userMsg: string = null;
  isInsufficientFunds: boolean = false;
  constructor() { }
  
  onTransferFund(): void {
    if(this.amount > this.maxCoins) {
      this.isInsufficientFunds = true;
      this.showUserMsg('Insufficient funds')
      
      return
    }
    this.isInsufficientFunds = false;
    this.handleTransfer.emit(this.amount)
    this.showUserMsg(`You transferred ${this.amount} coins`)
    this.amount = null;
  }
  
  showUserMsg (msg: string): void {
    this.userMsg = msg;
    setTimeout(() => {
      this.userMsg = null;
    }, 3000);
  }


  ngOnInit(): void {
  }

}
