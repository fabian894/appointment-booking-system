import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { AdduserComponent } from './adduser/adduser.component';
import { UsersComponent } from './users/users.component';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminDashboardComponent,
  
    children:[
        {path:'', component: HomeComponent},
        {path:'adduser', component: AdduserComponent},
        {path:'users', component: UsersComponent},
    ],
   },
  
];
