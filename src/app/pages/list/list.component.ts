import { Component, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public username? = localStorage.getItem('username');
  public taskArr?: any;
  public length: number = 0;

  private user: User = new User();

  constructor(private userService: UserService) {
    this.getUsersTasks();
  }

  ngOnInit(): void {
    this.getUsersTasks().then((data) => {
      this.taskArr = data;
    });
  }

  //NEED TO ADD EVERY TASK TO BACKEND DB

  signOut() {
    return this.userService.signOut();
  }

  addItem(f: any) {
    const item = f.value.task;
    this.userService.createTask(item);
    f.reset();
  }

  async getUsersTasks() {
    const arr: any = await this.userService.getTasks();
    // console.log(arr);
    const authh = getAuth();
    const user = authh.currentUser;

    const ttt = arr?.filter(function (obj: any) {
      return obj.user == user?.uid;
    });

    // console.log(ttt);
    this.taskArr = ttt;
    // console.log(this.userTournyData);
    this.length = this.taskArr.length;
  }

  removeItem(id: string) {
    this.userService.deleteTask(id);
  }
}
