import { DatePipe, NgFor } from '@angular/common';
import { Component} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarService } from './services/navbar.service';
import { GetSections } from '../models/GetSections.models';

@Component({
  selector: 'app-news-navbar',
  standalone: true,
  imports: [DatePipe,RouterOutlet, RouterLink, NgFor],
  templateUrl: './news-navbar.component.html',
  styleUrl: './news-navbar.component.scss'
})
export class NewsNavbarComponent {
  model : Array<GetSections> = [];
  currentDate = new Date();
  private timer: any;
  constructor(private news: NavbarService){
  }
  ngOnInit(): void {
    setTimeout(this.timer, 100);
    this.timer = setInterval(() => {
      this.currentDate = new Date();
    }, 1);
    this.GetNews()
  }
  GetNews() {
    this.news.getSections()
      .then(data => {
        this.model = data
        console.log(this.model)
      })
      .catch(error => {
        console.error(error);
      });
  }

  myFunction(id : any) {
    let a =(document.getElementById(id)! as HTMLInputElement).value ;
  }
}
