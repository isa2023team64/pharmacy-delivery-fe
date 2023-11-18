import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CompanySearchComponent } from './components/company-search/company-search.component';
import { RegisterComponent } from './infrastructure/auth/register/register.component';
import { RegistrationRequestComfirmationComponent } from './infrastructure/auth/registration-request-comfirmation/registration-request-comfirmation.component';
import { RegistrationRequestCompleteComponent } from './infrastructure/auth/registration-request-complete/registration-request-complete.component';
import { RegisterCompanyComponent } from './company/register-company/register-company.component';
import { UregisteredUserEquipmentComponent } from './unregistered-user/uregistered-user/uregistered-user-equipment/uregistered-user-equipment.component';
import { UregisteredUserCompaniesComponent } from './unregistered-user/uregistered-user/uregistered-user-companies/uregistered-user-companies.component';
import { EquipmentSearchComponent } from './components/equipment-search/equipment-search.component';
import { EquipmentCompaniesOverviewComponent } from './components/equipment-overview-companies/equipment-companies-overview.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
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
    path: 'company-search',
    component: CompanySearchComponent   
  },
  {
    path: 'equipment-search',
    component: EquipmentSearchComponent   
  },
  {
    path: 'registrationConfirmation',
    component: RegistrationRequestComfirmationComponent,
  },
  {
    path: 'registrationComplete/:id',
    component: RegistrationRequestCompleteComponent,
  },
  {
    path: 'registerCompany',
    component: RegisterCompanyComponent,
  },
  {
    path: 'unregisteredUserCompanies',
    component: UregisteredUserCompaniesComponent,
  },
  {
    path: 'unregisteredUserEquipment',
    component: UregisteredUserEquipmentComponent,
  },
  {
    path: 'equipment-companies-overview/:id',
    component: EquipmentCompaniesOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
