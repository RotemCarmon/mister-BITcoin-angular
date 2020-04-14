import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/models/user.model';
import { Move } from 'src/app/models/move.model';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  contact: Contact;
  contactId: string;
  idSub: Subscription;
  contactSub: Subscription;
  currUser: User;
  moves: Move[]

  constructor(
    private contactService: ContactService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.getContactById();
    this.getUser();
    this.getMoves();
  }
  getUser(): void {
    this.currUser = this.userService.getUser();
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
  }

  goBack(): void {
    this.location.back();
  }

  deleteContact(): void {
    this.contactService.deleteContact(this.contactId);
    console.log('in the details component');
    this.location.back();
  }
  editContact(): void {
    this.router.navigate(['contact/edit', { id: this.contactId }]);
  }

  handleTransfer(amount: number): void {
    console.log('Fund Transfering...');
    this.userService.addMove(this.contact, amount)
    console.log('Fund Tranfered successfully!!...');
  }

  getMoves(){
    this.moves = this.currUser.moves.filter(move => move.toId === this.contactId);
  }

  ngOnDestroy(): void {
    this.idSub.unsubscribe();
    this.contactSub.unsubscribe();
  }
}
