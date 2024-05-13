import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NewsDetailsService } from './services/news-details.service';
import { NgFor } from '@angular/common';
import { GetNews } from '../models/GetNews.models';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [NgFor,RouterLink],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.scss'
})
export class NewsDetailsComponent {
  News: Array<GetNews> | null = null;
  authToken: string = ''
  newsId: any
  constructor(public activateRoute: ActivatedRoute, private details: NewsDetailsService){}
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      this.newsId = params.get('id');
      this.details.getData(this.newsId)
        .then(data => {
          this.News = data
          console.log(this.News)
        })
        .catch(error => {
          console.error(error);
        });
    });
  }
}
