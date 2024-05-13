import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../../models/Author.models';

@Injectable({
  providedIn: 'root'
})
export class AuthorDetailsService {
  private apiUrl = 'https://localhost:7041/api/';
  constructor(private http: HttpClient) { }
  getData(id: number,authToken : string): Promise<Author[]> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.apiUrl + `Author/GetAuthorById?Id=${id}`, true);
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
  /*getData(id: number, SessionValue: string | null): Observable<Author> {
    console.log(SessionValue)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + SessionValue
    };
    console.log(headers)
    return this.http.get<Author>(`https://localhost:7041/api/Author/GetAuthorById?Id=${id}`,{headers})
  }*/
}
