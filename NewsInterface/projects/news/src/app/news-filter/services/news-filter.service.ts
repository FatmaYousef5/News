import { Injectable } from '@angular/core';
import { GetSections } from '../../models/GetSections.models';
import { GetNews } from '../../models/GetNews.models';

@Injectable({
  providedIn: 'root'
})
export class NewsFilterService {
  private apiUrl = 'https://localhost:7041/api/';

  constructor() { }

  getNews(id: number): Promise<GetNews[]> {
    alert(id)
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.apiUrl + `UserNews/GetNewsBySection?Id=${id}`, true);
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
