import { Component } from '@angular/core';
import { LoginRequest } from '../models/Login.models';
import { LoginService } from './services/login-service.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HttpRequest } from '@angular/common/http';
import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, AdminComponent, RouterModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  model: LoginRequest;
  firstValue: any = null;
  constructor(private router: Router, private login: LoginService, private cookieService: CookieService) {
    this.model = {
      UserName: '',
      Password: '',
      token: '',
    }
  }
  getLogin() {
    this.login.getData(this.model)
      .then(data => {
        if (data && Object.keys(data).length > 0) {
          const firstKey = Object.keys(data)[0];
          this.firstValue = data[firstKey];
        }
        sessionStorage.setItem('token', JSON.stringify(this.firstValue));
        //this.cookieService.set('token', JSON.stringify(this.firstValue));
        this.router.navigate(['/admin']);
      })
      .catch(error => {
        console.error(error);
      });
    /*this.login.getData(this.model).pipe(
      catchError(error => {
        const statusCode = error.status;
        return throwError(error);
      })
    )
    .subscribe(data => {
      if (data && Object.keys(data).length > 0) {
        const firstKey = Object.keys(data)[0];
        this.firstValue = data[firstKey];
        console.log(this.firstValue)
      }
      this.cookieService.set('token', JSON.stringify(this.firstValue));
      const cookieValue = this.cookieService.get('token');
      console.log(cookieValue)
    })*/
  }
}
