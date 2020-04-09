import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @Input() contactId: string;
  @Output() setIdToNull = new EventEmitter();
  contact: Contact;
  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
    this.getContactById()
  }
  getContactById(){
    this.contact = this.contactService.getContactById(this.contactId);
  }
  goBack(){
    this.setIdToNull.emit()
  }

}
