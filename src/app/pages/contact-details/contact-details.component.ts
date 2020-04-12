import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from "@angular/common";

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  contact: Contact;
  id: string;
  idSub:Subscription;
  contactSub:Subscription;
  constructor(private contactService:ContactService,private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getParams()
    this.getContactById()
  }

  getParams() {
    this.idSub = this.route.params.subscribe(params => {
      this.id = params['id']
    })
  }
  
  getContactById() :void{
    this.contactSub = this.contactService.getContactById(this.id)
      .subscribe((contact) => {
        this.contact = contact;
      })
  }

  goBack(){
    this.location.back()
  }
  
  deleteContact(){
    this.contactService.deleteContact(this.id)
    this.location.back()
  }

  ngOnDestroy(): void {
    this.idSub.unsubscribe();
    this.contactSub.unsubscribe();
  }
}
