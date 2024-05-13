import { Component } from '@angular/core';
import { NewsFilterService } from './services/news-filter.service';
import { GetNews } from '../models/GetNews.models';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-news-filter',
  standalone: true,
  imports: [NgFor, RouterLink, RouterOutlet],
  templateUrl: './news-filter.component.html',
  styleUrl: './news-filter.component.scss'
})
export class NewsFilterComponent {
  model : Array<GetNews> = [];
  sectionId : any
  constructor(private news: NewsFilterService, public activateRoute: ActivatedRoute){
  }
  ngOnInit(): void {
    this.GetNews()
  }
  GetNews() {
    this.activateRoute.paramMap.subscribe(params => {
      this.sectionId = params.get('id');
      this.news.getNews(this.sectionId)
      .then(data => {
        this.model = data
        console.log(this.model)
      })
      .catch(error => {
        console.error(error);
      });
    });
    
  }
}
