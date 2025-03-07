import { Component } from '@angular/core';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { HomeComponent } from '../home/home.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule, SidenavComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
