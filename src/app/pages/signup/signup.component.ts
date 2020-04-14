import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signup-page',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  username: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(form) {
    this.userService.signup(form.value);
    this.router.navigateByUrl('home')
  }
}
