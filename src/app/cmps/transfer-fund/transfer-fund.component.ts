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
  constructor() { }

  onTransferFund(): void {
    this.handleTransfer.emit(this.amount)
    this.showUserMsg()
    this.amount = null;
  }
  
  showUserMsg (): void {
    this.userMsg = `You transferred ${this.amount} coins`
    setTimeout(() => {
      this.userMsg = null;
    }, 3000);
  }


  ngOnInit(): void {
  }

}
