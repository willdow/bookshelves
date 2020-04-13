import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyDMaGJy6W3W2mnDQLUp6XhTZICPUnFHYB0",
      authDomain: "bookshelves-91133.firebaseapp.com",
      databaseURL: "https://bookshelves-91133.firebaseio.com",
      projectId: "bookshelves-91133",
      storageBucket: "bookshelves-91133.appspot.com",
      messagingSenderId: "281386723627",
      appId: "1:281386723627:web:bdc99576b25ce478c03d6e"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
