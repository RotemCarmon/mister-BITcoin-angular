import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { faUser, faPhone ,faEnvelope } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit, OnDestroy {
  contact: Contact;
  contactId: string;
  idSub: Subscription;
  contactSub: Subscription;
  editForm: FormGroup;
  faUser = faUser;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getParams();
    if (this.contactId) {
      this.getContactById();
    }
    this.setFormGroup();
  }
  setFormGroup(): void {
    this.editForm = this.fb.group({
      name: this.contact
        ? [this.contact.name, [Validators.required]]
        : ['', [Validators.required]],
      phone: this.contact ? this.contact.phone : '',
      email: this.contact
        ? [this.contact.email, [Validators.required]]
        : ['', [Validators.required]],
    });
  }

  getParams(): void {
    this.idSub = this.route.params.subscribe((params) => {
      this.contactId = params['id'];
    });
  }

  getContactById(): void {
    this.contactSub = this.contactService
      .getContactById(this.contactId)
      .subscribe((contact) => {
        this.contact = contact;
      });
    this.contactSub.unsubscribe();
  }

 

  onSubmit(): void {    
    var newContact = (!!this.contact)? this._prepareContact(this.editForm.value) : this.editForm.value

    this.contactService.saveContact(newContact);
    this.router.navigateByUrl('contact');
  }
  
  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.idSub.unsubscribe();
  }

  _prepareContact(newContact: Contact): Contact {
    this.contact.name = newContact.name;
    this.contact.phone = newContact.phone;
    this.contact.email = newContact.email;
    return this.contact;
  }
}
