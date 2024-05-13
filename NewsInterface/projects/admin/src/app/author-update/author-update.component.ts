import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthorDetailsService } from '../author-details/service/author-details.service';
import { Author } from '../models/Author.models';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { AuthorCreate } from '../models/CreateAuthor.models';
import { AuthorUpdateService } from './services/author-update.service';

@Component({
  selector: 'app-author-update',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, RouterModule, NgFor],
  templateUrl: './author-update.component.html',
  styleUrl: './author-update.component.scss'
})
export class AuthorUpdateComponent {
  author: Array<Author> | null = null;
  authToken: string = ''
  userId: any
  model: AuthorCreate

  constructor(public activateRoute: ActivatedRoute, private router: Router, private details: AuthorDetailsService, private update: AuthorUpdateService) {
    this.model = {
      name: '',
      address: '',
      phone: ''
    }
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

  UpdateAuthor(Id: number) {
    let Name =(document.querySelector(".name")! as HTMLInputElement).value ;
    let Address =(document.querySelector(".address")! as HTMLInputElement).value ;
    let Phone =(document.querySelector(".phone")! as HTMLInputElement).value ;
    this.model.name = Name
    this.model.address = Address
    this.model.phone = Phone
    this.authToken = JSON.parse(sessionStorage.getItem('token') || '{}');
    this.update.updateData(Id, this.model, this.authToken)
      .then(data => {
        this.router.navigate(['/admin']);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
