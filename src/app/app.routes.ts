import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ClientsBanqueComponent } from './pages/ClientsBanque/ClientsBanque.components';
import { WelcomeComponent } from './pages/Welcome/welcome.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'clients', component: ClientsBanqueComponent },
  { path: 'Welcome', component: WelcomeComponent }
];
