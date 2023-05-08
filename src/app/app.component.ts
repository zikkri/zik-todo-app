import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'zik-todo-app';
  loggedIn: boolean = false;
  public static userLoggedIn: any;
  constructor(private auth: AngularFireAuth) {}
  ngOnInit(): void {
    const loggedInStatus = localStorage.getItem('loggedIn');
    if (loggedInStatus && loggedInStatus === 'true') {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
        const uid = user.uid;
        AppComponent.userLoggedIn = user;
        const username = user?.displayName;
        // console.log(AppComponent.userLoggedIn);
        localStorage.setItem('userID', uid);
        if (username != null) {
          localStorage.setItem('username', username);
        }
        // console.log(uid);
      } else {
        this.loggedIn = false;
      }
    });
  }
}
