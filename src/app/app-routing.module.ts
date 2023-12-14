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
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { RegisteredUserProfileComponent } from './components/registered-user-profile/registered-user-profile.component';
import { EquipmentCompaniesOverviewComponent } from './components/equipment-overview-companies/equipment-companies-overview.component';
import { RegisterCompanyAdministratorComponent } from './components/company-administrator-registration/company-administrator-registration.component';
import { CompanyAdminProfileComponent } from './components/company-admin-profile/company-admin-profile.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { EquipmentSearchCompanyAdministratorComponent } from './components/equipment-search-company-administrator/equipment-search-company-administrator.component';
import { CompanyCalendarComponent } from './components/company-calendar/company-calendar.component';
import { AddEquipmentComponent } from './components/add-equipment/add-equipment.component';
import { EditEquipmentComponent } from './components/edit-equipment/edit-equipment.component';
import { RoleGuard } from './infrastructure/auth/auth-guard/auth-guard.guard';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

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
    path: 'company-details/:id',
    component: CompanyDetailsComponent,canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_USER'
    }
  },
  {
    path: 'profile/:id',
    component: RegisteredUserProfileComponent,
  },
  {
    path: 'equipment-companies-overview/:id',
    component: EquipmentCompaniesOverviewComponent,
  },
  {
    path: 'register-company-administrator/:id',
    component: RegisterCompanyAdministratorComponent,
  },
  {
    path: 'company-admin-profile/:id',
    component: CompanyAdminProfileComponent
  },
  {
    path: 'company-profile/:id',
    component: CompanyProfileComponent
  },
  {
    path: 'equipment-search-company-administrator',
    component: EquipmentSearchCompanyAdministratorComponent,
  },
  {
    path: 'company-calendar/:id',
    component: CompanyCalendarComponent
  },
  {
    path: 'add-equipment',
    component: AddEquipmentComponent,
  },
  {
    path: 'edit-equipment/:id',
    component: EditEquipmentComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
