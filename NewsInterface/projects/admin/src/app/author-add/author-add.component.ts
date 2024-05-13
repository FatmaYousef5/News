import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthorCreate } from '../models/CreateAuthor.models';
import { AuthorAddService } from './services/author-add.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-add',
  standalone: true,
  imports: [RouterModule, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './author-add.component.html',
  styleUrl: './author-add.component.scss'
})
export class AuthorAddComponent {
  model: AuthorCreate
  authToken: string = ''
  constructor(private router: Router,private author: AuthorAddService) {
    this.model = {
      name: '',
      address: '',
      phone: ''
    }
  }

  getAddAuthor() {
    this.authToken = JSON.parse(sessionStorage.getItem('token') || '{}');
    this.author.AddData(this.model,this.authToken)
      .then(data => {
        this.router.navigate(['/admin']);
      })
      .catch(error => {
        console.error(error);
      });
}
}
