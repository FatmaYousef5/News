import { HttpClientModule } from '@angular/common/http';
import { Component, Pipe } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Author } from '../models/Author.models';
import { AdminService } from './services/admin.service';
import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, RouterModule, NgFor, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})

export class AdminComponent {
  Author: Array<Author> = []
  authToken: string = ''
  constructor(private route: ActivatedRoute, private router: Router, private admin: AdminService) {
  }
  
  ngOnInit() {
    this.GetAuthors()
  }
  GetAuthors() {
    this.authToken = JSON.parse(sessionStorage.getItem('token') || '{}');
    this.admin.getData(this.authToken)
      .then(data => {
        this.Author = data
      })
      .catch(error => {
        console.error(error);
      });
  }

  OnDelete(authorId:number){
    this.authToken = JSON.parse(sessionStorage.getItem('token') || '{}');
    if (window.confirm('Are you sure to delete this record?!'))
      {
        this.admin.deleteAuthor(authorId, this.authToken)
        .then(data => {
          location.reload();
        })
        .catch(error => {
          console.error(error);
        });
      }
      else{
        this.router.navigate(['/admin']);
      }
  }
}
