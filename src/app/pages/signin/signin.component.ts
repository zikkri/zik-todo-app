import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  constructor(private userService: UserService) {}

  signin(f: any) {
    let email = f.value.email;
    let pass = f.value.password;
    return this.userService.signIn(email, pass);
  }
}
