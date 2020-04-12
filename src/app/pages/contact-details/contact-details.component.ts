import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  @Input() contactId: string;
  @Output() setIdToNull = new EventEmitter();
  contact: Contact;
  subscription
  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
    this.getContactById()
  }
  
  getContactById() :void{
    this.subscription = this.contactService.getContactById(this.contactId)
      .subscribe((contact) => {
        this.contact = contact;
      })
  }

  goBack(){
    this.setIdToNull.emit()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
