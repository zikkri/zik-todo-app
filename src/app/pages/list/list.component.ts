import { Component, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
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
  query,
  getDocs,
  orderBy,
} from '@angular/fire/firestore';

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

  constructor(private userService: UserService, private firestore: Firestore) {}

  ngOnInit(): void {
    console.log('trying to work oninit');

    this.getUsersTasks();
  }

  //NEED TO ADD EVERY TASK TO BACKEND DB

  signOut() {
    return this.userService.signOut();
  }

  addItem(f: any) {
    const item = f.value.task;
    this.userService.createTask(item);
    f.reset();
    this.getUsersTasks();
  }

  async getUsersTasks() {
    const userID = localStorage.getItem('userID');

    const q = query(
      collection(this.firestore, 'Tasks'),
      where('user', '==', userID),
      orderBy('date', 'desc')
    );

    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,

      ...doc.data(),
    }));

    this.taskArr = users;

    console.log(this.taskArr);
  }

  removeItem(id: string) {
    const docRef = doc(this.firestore, 'Tasks', id);
    deleteDoc(docRef);
    this.ngOnInit();
  }
}
