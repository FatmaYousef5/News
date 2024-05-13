import { Injectable } from '@angular/core';
import { GetNews } from '../../models/GetNews.models';

@Injectable({
  providedIn: 'root'
})
export class NewsDetailsService {
  private apiUrl = 'https://localhost:7041/api/';
  constructor() { }
  getData(id: number): Promise<GetNews[]> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.apiUrl + `UserNews/GetNewsById?Id=${id}`, true);
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
