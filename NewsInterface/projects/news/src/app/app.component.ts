import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NewsNavbarComponent } from '../app/news-navbar/news-navbar.component';
import { NgFor } from '@angular/common';
import { NewsComponent } from './news/news.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewsNavbarComponent, NewsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'News';
}
