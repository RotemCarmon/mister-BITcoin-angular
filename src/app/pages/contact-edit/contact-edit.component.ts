import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

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

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (this.route.params) {
      console.log('Params exict', this.route.params);
      this.getParams();
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
    console.log('contact', this.contact);
  }

  onSubmit() {
    console.log(this.editForm.value);
    this.contactService.saveContact(this.editForm.value);
    this.router.navigateByUrl('contact')
  }
  goBack() {
    console.log('Going back');
    this.location.back();
  }

  ngOnDestroy(): void {
    this.idSub.unsubscribe();
    this.contactSub.unsubscribe();
  }
}
