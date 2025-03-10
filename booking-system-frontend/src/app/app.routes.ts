import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserBookingComponent } from './components/user-booking/user-booking.component';
import { AuthGuard } from './guards/auth.guard';

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
        component: UserBookingComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'admin-dashboard',
        loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES), 
        canActivate: [AuthGuard] 
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
