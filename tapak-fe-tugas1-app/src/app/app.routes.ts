import { Routes } from '@angular/router';
import { Login as LoginComponent } from './pages/auth/login/login'
import { Register as RegisterComponent } from './pages/auth/register/register'
import { Pet as PetComponent } from './pages/pet/pet'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'pet',
    component: PetComponent,
  }
];
