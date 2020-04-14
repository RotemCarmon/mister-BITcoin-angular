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
  // maxCoins: number;
  @Output() handleTransfer = new EventEmitter();
  amount: number;
  constructor() { }

  onTransferFund(): void {
    // console.log('Transfering..', this.amount);
    this.handleTransfer.emit(this.amount)
  }
  ngOnInit(): void {
  }

}
