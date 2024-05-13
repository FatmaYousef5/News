import { Injectable } from '@angular/core';
import { AddNews } from '../../models/CreateNews.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { promises } from 'dns';
import { getSections } from '../../models/Sections.models';

@Injectable({
  providedIn: 'root'
})
export class NewsAddService {
  private apiUrl = 'https://localhost:7041/api/';
  constructor(private http: HttpClient) { }
  AddData(model: AddNews, authToken : string, Id : any, SectionId: any, Image : FormData): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', this.apiUrl + `News/AddNews?CreationDate=${model.CreationDate}&NewsContent=${model.NewsContent}&AuthorId=${Id}&Title=${model.title}&SectionId=${SectionId}`,true);
      xhr.setRequestHeader('Authorization', `Bearer ${authToken}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));           
          } else {
            reject(xhr.statusText);
          }
        }
      };
      xhr.send(Image);
    });
  }

  getSections(authToken : string): Promise<getSections[]> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.apiUrl + `News/GetSections`, true);
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
