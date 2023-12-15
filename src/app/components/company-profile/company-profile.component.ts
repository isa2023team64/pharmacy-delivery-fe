import { Component, OnInit } from '@angular/core';
import { Company } from '../../company/model/company.model';
import { CompanyService } from '../../company/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipment } from '../../infrastructure/rest/model/equipment.model';
import { faHouse, faPlus, faMinus, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CompanyAdministrator } from '../../infrastructure/auth/model/company-administrator.model';
import { CompanyEquipment } from '../../infrastructure/rest/model/company-equipment.model';
import { EquipmentService } from '../../company/equipment.service';
import { MatDialog } from "@angular/material/dialog";
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { Appointment } from '../../infrastructure/rest/model/appointmen.model';
import { AppointmentService } from '../../infrastructure/rest/appointment.service';

@Component({
  selector: 'pd-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent implements OnInit {
  
  companyId: number = -1;
  company: Company = new Company();
  equipment?: CompanyEquipment[];
  notOwnedEquipment?: CompanyEquipment[];
  canEdit: boolean = false;
  companyCopy?: any;
  errors: any;
  companyAdministrators?: CompanyAdministrator[];
  appointments: Appointment[] = [];

  faHouse = faHouse;
  faPlus = faPlus;
  faMinus = faMinus;
  faEdit = faEdit;

  constructor(private companyService: CompanyService, private equipmentService: EquipmentService, private appointmentService: AppointmentService, private route: ActivatedRoute, private router: Router, private dialogRef: MatDialog) { 
    this.companyCopy = {
      name: "",
      address: "",
      city: "",
      country: "",
      openingTime: "",
      closingTime: "",
      description: ""
    };

    this.errors = {
      name: "",
      address: "",
      city: "",
      country: "",
      openingTime: "",
      closingTime: "",
      description: ""
    };
  }
  
  ngOnInit(): void {
    this.setInputReadOnly(true);
    this.route.params.subscribe(params => {
      this.companyId = params['id'];
      this.getCompanyById(this.companyId);
      this.getCompanyEquipmentByCompanyId(this.companyId);
      this.getEquipmentNotOwnedByCompany(this.companyId);
      this.getAppointments(this.companyId);
    })
  }

  getCompanyById(id: number): void {
    this.companyService.getById(id).subscribe((result) => {
      this.company = result;
      this.companyAdministrators = this.company.companyAdministrators;
      console.log(this.companyAdministrators);
      this.makeCompanyCopy();
    })
  }

  getCompanyEquipmentByCompanyId(id: number) {
    this.companyService.getCompanyEquipmentByCompanyId(id).subscribe((results) => {
      this.equipment = results;
      if (this.equipment !== undefined) {
        this.equipment.forEach(eq => {
          eq.isAdded = true;
        });
      }
    })
  }

  getEquipmentNotOwnedByCompany(id: number) {
    this.companyService.getNotAddedCompanyEquipmentByCompanyId(id).subscribe((results) => {
      this.notOwnedEquipment = results;

      if (this.equipment !== undefined) {
        this.equipment.forEach(eq => {
          eq.isAdded = false;
        });
      }
    })
  }

  getAppointments(companyId: number): void {
    this.appointmentService.getAppointmentsByCompanyId(companyId).subscribe(result => {
      this.appointments = result;
    })
  }

  saveChanges(): void {
    if(this.validate()) {
      this.companyCopy.openingTime += ":00";
      this.companyCopy.closingTime += ":00";
      this.companyService.update(this.companyId, this.companyCopy).subscribe({
        next: (result: Company) => {
          this.company = result;
          this.makeCompanyCopy();
        },
        error: (errData) => {
          console.log(errData);
        }
      })
      this.endEditing();
    }
    
  }

  makeCompanyCopy(): void {
    const { ...companyCopy } = this.company;
    this.companyCopy = companyCopy;
  }

  startEditing(): void {
    this.canEdit = true;
    this.setInputReadOnly(false);
  }

  endEditing(): void {
    this.canEdit = false;
    this.resetErrors();
    this.setInputReadOnly(true);
    this.makeCompanyCopy();
  }

  setInputReadOnly(readOnly: boolean): void {
    var inputs = document.querySelectorAll('.profile-input');
    inputs.forEach(function(input) {
      const inputElement = input as HTMLInputElement;
      inputElement.readOnly = readOnly;
    });
  }

  validate(): boolean {
    let isValid = true;
    this.resetErrors()

    if (this.companyCopy.name === "") {
      this.errors.name = "Name is required.";
      isValid = false;
    }
    
    if (this.companyCopy.description === "") {
      this.errors.description = "Description is required.";
      isValid = false;
    }
    
    if (this.companyCopy.country === "") {
      this.errors.country = "Country is required.";
      isValid = false;
    }
    
    if (this.companyCopy.city === "") {
      this.errors.city = "City is required.";
      isValid = false;
    }
    
    if (this.companyCopy.address === "") {
      this.errors.address = "Address is required.";
      isValid = false;
    }
    
    if (this.companyCopy.openingTime === "") {
      this.errors.openingTime = "Opening time is required";
      isValid = false;
    }
    
    if (this.companyCopy.closingTime === "") {
      this.errors.closingTime = "Closing time is required";
      isValid = false;
    }

    return isValid
  }

  resetErrors(): void {
    this.errors.name = "";
    this.errors.address = "";
    this.errors.city = "";
    this.errors.country = "";
    this.errors.openingTime = "";
    this.errors.closingTime = "";
    this.errors.description = "";
  };

  addEquipment(eq: CompanyEquipment) {
    this.companyService.addEquimpentToCompany(this.companyId, eq.id!).subscribe((result) => {
      this.getCompanyEquipmentByCompanyId(this.companyId);
      this.getEquipmentNotOwnedByCompany(this.companyId);
    })
  }

  removeEquipment(eq: CompanyEquipment) {
    this.companyService.removeEquimpentFromCompany(this.companyId, eq.id!).subscribe((result) => {
      this.getCompanyEquipmentByCompanyId(this.companyId);
      this.getEquipmentNotOwnedByCompany(this.companyId);
    })
  }
  

  editEquipment(eq: CompanyEquipment) {
    this.router.navigate(['edit-equipment/' + eq.id]);
    // this.router.navigate(['login']);
  }

  addAppointment() {
    this.dialogRef.open(AppointmentFormComponent);
  }

}
