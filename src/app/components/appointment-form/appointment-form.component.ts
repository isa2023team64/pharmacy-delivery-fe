import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../infrastructure/rest/appointment.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AppointmentRequest } from '../../infrastructure/rest/model/appointment-request.model';
import { AuthService } from '../../infrastructure/auth';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
import { CompanyAdminService } from '../../infrastructure/rest/company-admin.service';
import { CompanyService } from '../../company/company.service';
import { Company } from '../../company/model/company.model';

@Component({
  selector: 'pd-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css'
})
export class AppointmentFormComponent implements OnInit {
  
  startDateTime: string = "";
  duration: number = 60;
  companyAdministratorName: string = "";
  errors: any;
  user: any;
  companyId: number = -1;
  company?: Company;

  constructor(
    private service: AppointmentService,
    public dialog: MatDialogRef<AppointmentFormComponent>,
    private authService: AuthService,
    private companyAdminService: CompanyAdminService,
    private companyService: CompanyService)
  {
    this.errors = {
      startDateTime: "",
      companyAdministratorName: "",
      duration: "",
    };
  }
  ngOnInit(): void {
    this.fetchCompany();
  }

  submit(): void {
    if (this.validate()) {
      let a: AppointmentRequest = {
        startDateTime: this.startDateTime,
        companyAdministratorFullName: this.companyAdministratorName,
        duration: this.duration,
        companyId: this.companyId
      };
      this.service.createAppointment(a).subscribe(result => {
        console.log(result);
        this.dialog.close();
        location.reload();
      })
    }
  }

  fetchCompany(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user.id) return;
      let userId = user.id;
      console.log("broj korisnika je " + userId);

      this.companyAdminService.getById(userId).subscribe(registeredUser => {
        this.companyId = registeredUser.companyId;
        console.log('wtf' + registeredUser.companyId);
        this.user = registeredUser;
        this.companyService.getById(registeredUser.companyId).subscribe(result => {
          this.company = result;
        })
      })
    });
  }

  validate(): boolean {
    let isValid = true;
    this.resetErrors();

    if (this.companyAdministratorName === "") {
      this.errors.companyAdministratorName = "Company administrator name is required.";
      isValid = false;
    }
    if (this.startDateTime === "") {
      this.errors.companyAdministratorName = "Start date and time is required.";
      isValid = false;
    }
    if (this.duration === null) {
      this.errors.companyAdministratorName = "Duration is required.";
      isValid = false;
    }
    if (!this.isInWorkingHours()) {
      this.errors.companyAdministratorName = "Start time must be in working hours.";
      isValid = false;
    }

    return isValid;
  }

  resetErrors(): void {
    this.errors.startDateTime = "";
    this.errors.companyAdministratorName = "";
    this.errors.duration = "";
  }

  isInWorkingHours(): boolean {
    let sdt = this.extractTime(this.startDateTime);
    let result1 = this.compareDates(sdt, this.company!.openingTime);
    let result2 = this.compareDates(sdt, this.company!.closingTime);
    if (result1 === -1 || result2 === 1) { // vreme pocetka termina je pre pocetka radnog vremena
      return false;
    }
    return true;
  }

  compareDates(dateString1: string, dateString2: string) {
    const [hours1, minutes1, seconds1] = dateString1.split(':').map(Number);
    const [hours2, minutes2, seconds2] = dateString2.split(':').map(Number);
  
    if (hours1 === hours2 && minutes1 === minutes2 && seconds1 === seconds2) {
      return 0; // Dates are equal
    } else if (hours1 > hours2 || (hours1 === hours2 && minutes1 > minutes2) || (hours1 === hours2 && minutes1 === minutes2 && seconds1 > seconds2)) {
      return 1; // dateString1 is later than dateString2
    } else {
      return -1; // dateString1 is earlier than dateString2
    }
  }

  extractTime(dateTimeString: string) {
    const timePart = dateTimeString.split('T')[1].concat(':00');
    return timePart;
  }

}
