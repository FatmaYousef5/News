import { Injectable } from '@angular/core';
import { AuthorCreate } from '../../models/CreateAuthor.models';

@Injectable({
  providedIn: 'root'
})
export class AuthorAddService {
  private apiUrl = 'https://localhost:7041/api/';
  constructor() { }

  AddData(model: AuthorCreate, authToken : string): Promise<any> {

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', this.apiUrl + `Author/AddAuthor?name=${model.name}&address=${model.address}&phone=${model.phone}`, true);
      xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);
      xhr.setRequestHeader('Content-Type', 'application/json');
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
