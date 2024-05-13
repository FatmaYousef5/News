import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorAddComponent } from './author-add/author-add.component';
import { AuthorUpdateComponent } from './author-update/author-update.component';
import { NewsDashboardComponent } from './news-dashboard/news-dashboard.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsAddComponent } from './news-add/news-add.component';
import { NewsUpdateComponent } from './news-update/news-update.component';
export const routes: Routes = [
    {path : 'adminLogin', component : AdminLoginComponent},
    {path : 'admin', component : AdminComponent},
    {path : 'admin', component : NavBarComponent},
    {path:"authorDetail/:id",component:AuthorDetailsComponent},
    {path:"authorCreate",component:AuthorAddComponent},
    {path:"authorUpdate/:id",component:AuthorUpdateComponent},
    {path:"news",component:NewsDashboardComponent},
    {path:"newsDetails/:id",component:NewsDetailsComponent},
    {path:"newsCreate",component:NewsAddComponent},
    {path:"newsUpdate/:id",component:NewsUpdateComponent},
];
