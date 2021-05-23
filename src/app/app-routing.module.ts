import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './core/home/home.component';
import { RegisterComponent } from './core/register/register.component';
import { ProfileComponent } from './core/profile/profile.component';

const routes: Routes = [
  {
    path:'', component:HomeComponent, pathMatch:'full'
  },
  {
    path:'profile', component:ProfileComponent, pathMatch:'full'
  },
  {
    path:'login', component:LoginComponent, pathMatch:'full'
  },
  {
    path:'register', component:RegisterComponent, pathMatch:'full'
  },
  {
    path:'**', component:PageNotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
