import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  public username? = localStorage.getItem('username');

  public testing: string[] = [];

  constructor(private userService: UserService) {}

  //NEED TO ADD EVERY TASK TO BACKEND DB

  signOut() {
    return this.userService.signOut();
  }

  addItem(f: any) {
    this.testing.push(f.value.task);
    f.reset();
  }

  removeItem() {
    this.testing.pop();
  }
}
