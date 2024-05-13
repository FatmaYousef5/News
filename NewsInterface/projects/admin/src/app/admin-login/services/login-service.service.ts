import { Injectable } from '@angular/core';
import { LoginRequest } from '../../models/Login.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:7041/api/';
  constructor(private http: HttpClient) { }
  /*getData (model : LoginRequest) : Observable<any>{
return this.http.get(`https://localhost:7041/api/Admin/GetAdmin?username=${model.UserName}&password=${model.Password}`)
  }*/
  getData(model: LoginRequest): Promise<any> {

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', this.apiUrl + `Admin/GetAdmin?username=${model.UserName}&password=${model.Password}`, true);
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
