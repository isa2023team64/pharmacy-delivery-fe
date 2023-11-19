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
import { RegisteredUserProfileComponent } from './registered-user-profile/registered-user-profile.component';
import { EquipmentCompaniesOverviewComponent } from './equipment-overview-companies/equipment-companies-overview.component';
import { RegisterCompanyAdministratorComponent } from './company-administrator-registration/company-administrator-registration.component';
import { EquipmentSearchCompanyAdministratorComponent } from './equipment-search-company-administrator/equipment-search-company-administrator.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    CompanySearchComponent,
    EquipmentSearchComponent,
    RegisteredUserProfileComponent,
    EquipmentCompaniesOverviewComponent,
    RegisterCompanyAdministratorComponent,
    EquipmentSearchCompanyAdministratorComponent,
  ],
  imports: [CommonModule, RouterModule,MaterialModule, FontAwesomeModule, FormsModule,
    ReactiveFormsModule],
  exports: [HomeComponent, LoginComponent,  NavbarComponent],
})
export class ComponentsModule {}
