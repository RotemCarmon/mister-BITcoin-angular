import { Component, OnInit, OnDestroy} from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})

export class ContactPageComponent implements OnInit, OnDestroy {
  contacts : Contact[] = []
  subscription: Subscription
  contactId: string = null;
  filterBy = { term: '' }
  

  constructor(private contactService: ContactService) { 
    this.subscription = this.contactService.contacts$.subscribe((contacts) => {
      this.contacts = [...contacts];
  })
}

  ngOnInit(): void {
    this.contactService.loadContacts()
  }
  
  setContactId($event) {
    this.contactId = $event;
  }
  setIdToNull() {
    this.contactId = null;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  setFilterBy(filterBy){
    this.filterBy = filterBy;
    this.contactService.loadContacts(this.filterBy)
  }
}  

