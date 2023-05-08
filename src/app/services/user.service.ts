import { Injectable } from '@angular/core';
// import {
//   Firestore,
//   collection,
//   addDoc,
//   collectionData,
//   doc,
//   updateDoc,
//   deleteDoc,
//   getDoc,
// } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserCredential, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private auth: AngularFireAuth
  ) {}

  createUser(email: string, password: string, displayName: string) {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        this.addUsername(userCred, displayName);
        console.log('user added');
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });

    this.router.navigateByUrl('');
  }

  addUsername(userCred: any, displayName: string) {
    updateProfile(userCred.user, { displayName });
  }

  signIn(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed in successfully
        console.log(userCredential);

        // Save logged in status in local storage
        localStorage.setItem('loggedIn', 'true');
        this.router.navigateByUrl('/list');
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  }

  signOut() {
    this.auth
      .signOut()
      .then(() => {
        // User signed out successfully
        console.log('User signed out');
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });

    localStorage.clear();
    this.router.navigateByUrl('');
  }

  refresh(): void {
    window.location.reload();
  }
}
