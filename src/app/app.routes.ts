import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ClientsBanqueComponent } from './pages/ClientsBanque/ClientsBanque.components';
import { WelcomeComponent } from './pages/Welcome/welcome.component'; // Ta nouvelle Landing
import { RegisterComponent } from './pages/register/register.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { BeneficiaryManagementComponent } from './pages/beneficiaries/beneficiary-management.component';

export const routes: Routes = [
  // La racine affiche la vitrine directement
  { path: '', component: WelcomeComponent }, 
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'beneficiaries', component: BeneficiaryManagementComponent },
  { path: 'clients', component: ClientsBanqueComponent },

  // Si l'utilisateur tape une bêtise, on le ramène à l'accueil
  { path: '**', redirectTo: '' }
];