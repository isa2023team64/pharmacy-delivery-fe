import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    CompanySearchComponent,
    EquipmentSearchComponent,
    EquipmentCompaniesOverviewComponent,
  ],
  imports: [CommonModule, RouterModule,MaterialModule, FontAwesomeModule, FormsModule],
  exports: [HomeComponent, LoginComponent,  NavbarComponent],
})
export class ComponentsModule {}
