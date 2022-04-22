import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { SubscriberAddComponent } from './components/subscribers/subscriber-add/subscriber-add.component';
import { SubscriberListComponent } from './components/subscribers/subscriber-list/subscriber-list.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AuthGuard } from './_auth/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PcRegistrationComponent } from './components/pc-registration/pc-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubscriberAddComponent,
    SubscriberListComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    PcRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [authInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
