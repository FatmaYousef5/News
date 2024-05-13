import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { getNews } from '../../../../admin/src/app/models/News.models';
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor, RouterLink],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  News: Array<getNews> = []
  constructor(private news: NewsService) {
  }
  ngOnInit() {
    this.GetNews()
  }
  GetNews() {
    this.news.getNews()
      .then(data => {
        this.News = data
      })
      .catch(error => {
        console.error(error);
      });
  }
}
