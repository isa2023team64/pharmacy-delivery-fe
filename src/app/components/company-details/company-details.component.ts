import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../company/company.service';
import { Company } from '../../company/model/company.model';
import { ActivatedRoute } from '@angular/router';
import { faLocationDot, faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import { Equipment } from '../../infrastructure/rest/model/equipment.model';
import { MatDialog } from '@angular/material/dialog';
import { ReservationComponent } from '../reservation/reservation.component';

@Component({
  selector: 'pd-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent implements OnInit {
  
  companyId: number = -1;
  company?: Company;
  equipment?: Equipment[];
  equipmentIds: number[] = [];

  faLocationDot = faLocationDot;
  faStar = faStar;
  faClock = faClock;

  constructor(private route: ActivatedRoute, private service: CompanyService, 
    public dialogRef: MatDialog) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.companyId = params['id'];
      this.getCompanyById(this.companyId);
      this.getEquipmentByCompanyId(this.companyId);
    })
  }

  getCompanyById(id: number) {
    this.service.getById(id).subscribe((result) => {
      this.company = result;
    })
  }

  getEquipmentByCompanyId(id: number) {
    this.service.getEquipmentByCompanyId(id).subscribe((results) => {
      this.equipment = results;
    })
  }

  toggleOrderItem(id: number | undefined): void {
    const index = this.equipmentIds.indexOf(id!);
    if (index !== -1) {
      this.equipmentIds.splice(index, 1);
    } else {
        this.equipmentIds.push(id!);
    }
  }

  isItemSelected(id: number | undefined) {
    return this.equipmentIds.includes(id!);
  }

  onMakeAReservation(): void {
    const reservationData = {
      companyId: this.companyId,
      equipmentIds: this.equipmentIds,
    };

    this.dialogRef.open(ReservationComponent, {
      data: reservationData,
    });
  }
}
