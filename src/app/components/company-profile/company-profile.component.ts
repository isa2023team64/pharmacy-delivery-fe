import { Component, OnInit } from '@angular/core';
import { Company } from '../../company/model/company.model';
import { CompanyService } from '../../company/company.service';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from '../../infrastructure/rest/model/equipment.model';

@Component({
  selector: 'pd-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent implements OnInit {
  
  companyId: number = -1;
  company?: Company;
  equipment?: Equipment[];

  constructor(private service: CompanyService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.companyId = params['id'];
      this.getCompanyById(this.companyId);
      this.getEquipmentByCompanyId(this.companyId);
    })
  }

  getCompanyById(id: number): void {
    this.service.getById(id).subscribe((result) => {
      this.company = result;
    })
  }

  getEquipmentByCompanyId(id: number) {
    this.service.getEquipmentByCompanyId(id).subscribe((results) => {
      this.equipment = results;
    })
  }

}
