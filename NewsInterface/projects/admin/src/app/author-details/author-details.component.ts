import { Component } from '@angular/core';
import { Author } from '../models/Author.models';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthorDetailsService } from './service/author-details.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, RouterModule, NgFor],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.scss'
})
export class AuthorDetailsComponent {
  author: Array<Author> | null = null;
  authToken: string = ''
  userId: any

  constructor(public activateRoute: ActivatedRoute, private router: Router, private details: AuthorDetailsService) {
  }
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.authToken = JSON.parse(sessionStorage.getItem('token') || '{}');
      this.details.getData(this.userId, this.authToken)
        .then(data => {
          this.author = data
        })
        .catch(error => {
          console.error(error);
        });
    });
  }
}

