import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PcRegistrationComponent } from './components/pc-registration/pc-registration.component';
import { SubscriberAddComponent } from './components/subscribers/subscriber-add/subscriber-add.component';
import { SubscriberListComponent } from './components/subscribers/subscriber-list/subscriber-list.component';
import { AuthGuard } from './_auth/auth.guard';

const routes: Routes = [
  { path: '', component: SubscriberListComponent, canActivate: [AuthGuard], data: { role: "ROLE_ADMIN" } },
  { path: 'login', component: LoginComponent },
  { path: 'subscribers', component: SubscriberListComponent, canActivate: [AuthGuard], data: { role: "ROLE_ADMIN" } },
  { path: 'subscribers/add', component: SubscriberAddComponent, canActivate: [AuthGuard], data: { role: "ROLE_ADMIN" } },
  { path: 'pcRegistrationForm', component: PcRegistrationComponent },
  { path: '**', redirectTo: '/' }
  // { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
