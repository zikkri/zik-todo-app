import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  where,
} from '@angular/fire/firestore';

import { getAuth } from '@angular/fire/auth';
import { getDocs, query } from 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserCredential, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userTaskData!: any;
  private user: User = new User();
  constructor(
    private firestore: Firestore,
    private router: Router,
    private auth: AngularFireAuth
  ) {}

  //SIGNUP A USER
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

  //CREATE USERNAME FOR USER
  addUsername(userCred: any, displayName: string) {
    updateProfile(userCred.user, { displayName });
    localStorage.setItem('username', displayName);
  }

  //SIGNIN A USER
  signIn(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed in successfully
        console.log(userCredential);

        //MAYBE ADD IN CREATE AND PASS BACK A NEW USER TO SIGNIN FUNCTION
        // Save logged in status in local storage
        localStorage.setItem('loggedIn', 'true');
        this.router.navigateByUrl('/list');
      })
      .catch((error) => {
        window.alert('Invalid login details, please try again.');
        console.error(error);
      });
  }

  //SIGNOUT A USER
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

  //ADD TASKS FOR USER
  createTask(f: any) {
    const tasksDB = collection(this.firestore, 'Tasks');

    const authh = getAuth();
    const user = authh.currentUser;

    const newTask = {
      task: f,
      user: user?.uid,
      date: Date.now(),
    };

    addDoc(tasksDB, newTask)
      .then(() => {
        console.log('task created succesfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //GET ALL TASKS - THEN FILTER ON THE COMPONENT SIDE
  getTasks() {
    const tasksDB = collection(this.firestore, 'Tasks');
    collectionData(tasksDB, { idField: 'id' }).subscribe((data) => {
      this.userTaskData = data;
      // console.log(this.userTaskData);
    });

    return this.userTaskData;
  }

  //DELETE TASK
  deleteTask(id: string) {
    const docRef = doc(this.firestore, 'Tasks', id);
    deleteDoc(docRef);
  }

  refresh(): void {
    window.location.reload();
  }
}
