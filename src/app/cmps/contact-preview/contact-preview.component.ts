import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})
export class ContactPreviewComponent implements OnInit {
  @Input() contact: Contact;

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  showContactDetails () {
    this.router.navigateByUrl(`contact/${this.contact._id}`)
  }
}
