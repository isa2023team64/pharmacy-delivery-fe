import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CompanySearchComponent } from './company-search/company-search.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';
import { EquipmentCompaniesOverviewComponent } from './equipment-overview-companies/equipment-companies-overview.component';
import { RegisterCompanyAdministratorComponent } from './company-administrator-registration/company-administrator-registration.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    CompanySearchComponent,
    EquipmentSearchComponent,
    EquipmentCompaniesOverviewComponent,
    RegisterCompanyAdministratorComponent,
  ],
  imports: [CommonModule, RouterModule,MaterialModule, FontAwesomeModule, FormsModule,
    ReactiveFormsModule],
  exports: [HomeComponent, LoginComponent,  NavbarComponent],
})
export class ComponentsModule {}
