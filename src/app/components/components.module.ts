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
import { CompanyCardComponent } from './company-card/company-card.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { EquipmentCardComponent } from './equipment-card/equipment-card.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    CompanySearchComponent,
    EquipmentSearchComponent,
    CompanyCardComponent,
    CompanyDetailsComponent,
    EquipmentCardComponent
  ],
  imports: [CommonModule, RouterModule,MaterialModule, FontAwesomeModule, FormsModule],
  exports: [HomeComponent, LoginComponent,  NavbarComponent, CompanyCardComponent, CompanyDetailsComponent, EquipmentCardComponent],
})
export class ComponentsModule {}
