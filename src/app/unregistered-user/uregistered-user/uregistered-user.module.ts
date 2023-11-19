import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UregisteredUserCompaniesComponent } from './uregistered-user-companies/uregistered-user-companies.component';
import { UregisteredUserEquipmentComponent } from './uregistered-user-equipment/uregistered-user-equipment.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  declarations: [
    UregisteredUserCompaniesComponent,
    UregisteredUserEquipmentComponent
  ],
  imports: [
    CommonModule, 
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ComponentsModule
  ],
  exports: [
    UregisteredUserCompaniesComponent,
    UregisteredUserEquipmentComponent
  ],
})
export class UregisteredUserModule { }
