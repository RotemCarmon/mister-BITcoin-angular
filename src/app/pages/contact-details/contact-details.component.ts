import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  contact: Contact;
  id: string;
  idSub;
  contactSub
  constructor(private contactService:ContactService,private router: Router, private route: ActivatedRoute,) { }

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
    this.router.navigateByUrl('contact')
  }

  ngOnDestroy(): void {
    this.idSub.unsubscribe();
    this.contactSub.unsubscribe();
  }
}
