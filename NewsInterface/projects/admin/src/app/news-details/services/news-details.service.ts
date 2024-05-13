import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getNews } from '../../models/News.models';

@Injectable({
  providedIn: 'root'
})
export class NewsDetailsService {
  private apiUrl = 'https://localhost:7041/api/';
  constructor(private http: HttpClient) { }
  getData(id: number, authToken: string): Promise<getNews[]> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.apiUrl + `News/GetNewsById?Id=${id}`, true);
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
