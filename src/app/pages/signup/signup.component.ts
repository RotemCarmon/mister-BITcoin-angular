import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'signup-page',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username: string = ''

  constructor(private userService: UserService) { }

  onSubmit (form) {
    console.log('submitted', form.value);
    this.userService.signup(form.value)
  }

}
