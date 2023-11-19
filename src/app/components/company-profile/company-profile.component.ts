import { Component, OnInit } from '@angular/core';
import { Company } from '../../company/model/company.model';
import { CompanyService } from '../../company/company.service';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from '../../infrastructure/rest/model/equipment.model';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pd-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent implements OnInit {
  
  companyId: number = -1;
  company: Company = new Company();
  equipment?: Equipment[];
  canEdit: boolean = false;
  companyCopy?: any;
  errors: any;

  faHouse = faHouse;

  constructor(private service: CompanyService, private route: ActivatedRoute) { 
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
      this.getEquipmentByCompanyId(this.companyId);
    })
  }

  getCompanyById(id: number): void {
    this.service.getById(id).subscribe((result) => {
      this.company = result;
      this.makeCompanyCopy();
    })
  }

  getEquipmentByCompanyId(id: number) {
    this.service.getEquipmentByCompanyId(id).subscribe((results) => {
      this.equipment = results;
    })
  }

  saveChanges(): void {
    if(this.validate()) {
      this.companyCopy.openingTime += ":00";
      this.companyCopy.closingTime += ":00";
      this.service.update(this.companyId, this.companyCopy).subscribe({
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

}
