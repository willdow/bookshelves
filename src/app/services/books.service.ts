import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Book } from '../models/Book.model';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();
  constructor() { }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      });
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value')
          .then(
            (data) => resolve(data.val()),
            (error) => reject(error)
          );
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => console.log("Img deleted")
      ).catch(
        (error) => console.log("File not found " + error)
      )
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('img/' + almostUniqueFileName + file.name)
          .put(file)
          .then(snapshot => {
            // Will return a promise with the download link
            return snapshot.ref.getDownloadURL();
          })
          .then(downloadURL => {
            console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
            resolve(downloadURL);
          })
          .catch(error => {
            console.log(`Failed to upload file and get link - ${error}`);
            reject();
          });
      }
    );
  }
}
