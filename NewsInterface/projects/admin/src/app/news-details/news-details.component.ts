import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NewsDetailsService } from './services/news-details.service';
import { getNews } from '../models/News.models';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [NgFor,RouterLink],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.scss'
})
export class NewsDetailsComponent {
  news: Array<getNews> | null = null;
  authToken: string = ''
  userId: any
  constructor(public activateRoute: ActivatedRoute, private router: Router, private details: NewsDetailsService){}
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.authToken = JSON.parse(sessionStorage.getItem('token') || '{}');
      this.details.getData(this.userId, this.authToken)
        .then(data => {
          this.news = data
        })
        .catch(error => {
          console.error(error);
        });
    });
  }
}
