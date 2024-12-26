import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MainPageComponent } from './pages/mainpage/mainpage.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent }, 
    { path: 'login', component: LoginComponent }, 
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }
  ];