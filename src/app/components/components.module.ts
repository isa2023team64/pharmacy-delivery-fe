import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CompanySearchComponent } from './company-search/company-search.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CompanySearchComponent
  ],
  imports: [CommonModule, RouterModule, FontAwesomeModule, FormsModule],
  exports: [HomeComponent, LoginComponent, RegisterComponent, NavbarComponent],
})
export class ComponentsModule {}
