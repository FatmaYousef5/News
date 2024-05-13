import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, AdminComponent,RouterModule,AdminLoginComponent,NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title='Admin'
}
/*this.login.getData(this.model).subscribe(data => {
      if (data && Object.keys(data).length > 0) {
        const firstKey = Object.keys(data)[0];
        this.firstValue = data[firstKey];
      }
      this.cookieService.set('token', JSON.stringify(this.firstValue));
      const cookieValue = this.cookieService.get('token');
    })*/