import { Component } from '@angular/core';
import { getNews } from '../models/News.models';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NewsDashboardService } from './services/news-dashboard.service';
import { NgFor } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news-dashboard',
  standalone: true,
  imports: [RouterModule,NgFor],
  templateUrl: './news-dashboard.component.html',
  styleUrl: './news-dashboard.component.scss'
})
export class NewsDashboardComponent {
  News: Array<getNews> = []
  authToken: string = ''
  image: any;
  constructor(private route: ActivatedRoute, private router: Router, private news: NewsDashboardService, private sanitizer: DomSanitizer) {
  }
  
  ngOnInit() {
    this.GetNews()
  }
  GetNews() {
    this.authToken = JSON.parse(sessionStorage.getItem('token') || '{}');
    this.news.getNews(this.authToken)
      .then(data => {
        this.News = data
      })
      .catch(error => {
        console.error(error);
      });
  }

  OnDelete(newsId:number){
    this.authToken = JSON.parse(sessionStorage.getItem('token') || '{}');
    if (window.confirm('Are you sure to delete this record?!'))
      {
        this.news.deleteNews(newsId, this.authToken)
        .then(data => {
          location.reload();
        })
        .catch(error => {
          console.error(error);
        });
      }
      else{
        this.router.navigate(['/news']);
      }
  }
}
