import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  public username? = localStorage.getItem('username');

  public testing: string[] = ['zzzz', 'ssss', 'rrrrr', 'ttttt'];

  constructor(private userService: UserService) {}

  signOut() {
    return this.userService.signOut();
  }
}
