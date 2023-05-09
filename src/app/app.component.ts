import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'zik-todo-app';
  loggedIn: boolean = false;
  public static userLoggedIn: any;
  constructor(private auth: AngularFireAuth, private router: Router) {}
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
        localStorage.setItem('userID', uid);
        if (username != null) {
          localStorage.setItem('username', username);
          this.router.navigate(['list']);
        }
      } else {
        this.loggedIn = false;
      }
    });
  }
}
