import { Component, OnInit } from '@angular/core';
import { Company } from '../../company/model/company.model';
import { CompanyService } from '../../company/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipment } from '../../infrastructure/rest/model/equipment.model';
import { faHouse, faPlus, faMinus, faEdit, faL } from '@fortawesome/free-solid-svg-icons';
import { CompanyAdministrator } from '../../infrastructure/auth/model/company-administrator.model';
import { CompanyEquipment } from '../../infrastructure/rest/model/company-equipment.model';
import { EquipmentService } from '../../company/equipment.service';
import { MatDialog } from "@angular/material/dialog";
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { Appointment } from '../../infrastructure/rest/model/appointmen.model';
import { AppointmentService } from '../../infrastructure/rest/appointment.service';
import { AuthService } from '../../infrastructure/auth';
import { CompanyAdminService } from '../../infrastructure/rest/company-admin.service';
import { eq } from '@fullcalendar/core/internal-common';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';



@Component({
  selector: 'pd-map-delivery',
  templateUrl: './map-delivery.component.html',
  styleUrl: './map-delivery.component.css'
})
export class MapDeliveryComponent implements OnInit {
  
  companyId: number = -1;
  company: Company = new Company();
  equipment?: CompanyEquipment[];
  canEdit: boolean = false;
  companyCopy?: any;
  errors: any;
  companyAdministrators?: CompanyAdministrator[];
  appointments: Appointment[] = [];
  user: any;
  searchText: string = '';
  equipmentSearched: CompanyEquipment[] = [];


  faHouse = faHouse;
  faPlus = faPlus;
  faMinus = faMinus;
  faEdit = faEdit;


  constructor(private companyService: CompanyService,
              private authService: AuthService,
              private companyAdminService: CompanyAdminService,
              private route: ActivatedRoute,
              private router: Router,
              private dialogRef: MatDialog) { 
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
    // this.route.params.subscribe(params => {
      // this.companyId = params['id'];
      // this.getCompanyById(this.companyId);
      this.fetchCompany();
    // })
  }

  fetchCompany(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user.id) return;
      let userId = user.id;
      this.companyAdminService.getById(userId).subscribe(registeredUser => {
        this.companyId = registeredUser.companyId;
        this.user = registeredUser;
        this.getCompanyById(this.companyId);
      })
    });
  }

  getCompanyById(id: number): void {
    this.companyService.getById(id).subscribe((result) => {
      this.company = result;
      this.companyAdministrators = this.company.companyAdministrators;
      this.getCompanyEquipmentByCompanyId(this.companyId);
      this.makeCompanyCopy();
    })
  }

  getCompanyEquipmentByCompanyId(id: number) {
    this.companyService.getCompanyEquipmentByCompanyId(id).subscribe((results) => {
      this.equipment = results;
      this.equipmentSearched = results;
      if (this.equipment !== undefined) {
        this.equipment.forEach(eq => {
          eq.isAdded = true;
        });
      }
    })
  }

  makeCompanyCopy(): void {
    const { ...companyCopy } = this.company;
    this.companyCopy = companyCopy;
  }

  setInputReadOnly(readOnly: boolean): void {
    var inputs = document.querySelectorAll('.profile-input');
    inputs.forEach(function(input) {
      const inputElement = input as HTMLInputElement;
      inputElement.readOnly = readOnly;
    });
  }



}
