import { Component, OnInit, OnDestroy} from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})

export class ContactPageComponent implements OnInit, OnDestroy {
  contacts : Contact[] = []
  subscription: Subscription
  filterBy = { term: '' }
  faUserPlus = faUserPlus
  

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.subscription = this.contactService.contacts$.subscribe(contacts => {
      this.contacts = contacts;
    })
    this.contactService.loadContacts()
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  setFilterBy(filterBy){
    this.filterBy = filterBy;
    this.contactService.loadContacts(this.filterBy)
  }
}  

