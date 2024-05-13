import { Routes } from '@angular/router';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsComponent } from './news/news.component';
import { NewsFilterComponent } from './news-filter/news-filter.component';

export const routes: Routes = [
    {path:"",component:NewsComponent},
    {path:"newsDetail/:id",component:NewsDetailsComponent},
    {path:"newsFilter/:id",component:NewsFilterComponent},
];
