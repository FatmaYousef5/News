import { Injectable } from '@angular/core';
import { GetSections } from '../../models/GetSections.models';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private apiUrl = 'https://localhost:7041/api/';
  constructor() { }
  getSections(): Promise<GetSections[]> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.apiUrl + `UserNews/GetSections`, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.statusText);
          }
        }
      };
      xhr.send();
    });
  }
}
