import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pd-company-admin-appointments-management',
  templateUrl: './company-admin-appointments-management.component.html',
  styleUrl: './company-admin-appointments-management.component.css',
})
export class CompanyAdminAppointmentsManagementComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {}
}
