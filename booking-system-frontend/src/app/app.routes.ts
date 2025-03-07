import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserBookingComponent } from './components/user-booking/user-booking.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'user-booking',
        component: UserBookingComponent
    },
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'admin-dashboard',
        loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    { path: '**', redirectTo: '' }
];
