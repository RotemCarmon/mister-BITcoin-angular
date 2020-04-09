import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  @Input() contacts: Contact;
  @Output() sendContactId  = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  setContactId($event) {
    this.sendContactId.emit($event)
  }

}
