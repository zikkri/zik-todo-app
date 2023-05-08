import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private userService: UserService) {}

  createUser(f: any) {
    return this.userService.createUser(
      f.value.email,
      f.value.password,
      f.value.username
    );
  }
}
