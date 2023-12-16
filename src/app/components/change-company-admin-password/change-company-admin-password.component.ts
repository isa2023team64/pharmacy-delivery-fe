import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../infrastructure/auth';
import { CompanyAdminService } from '../../infrastructure/rest/company-admin.service';
import { CompanyAdmin } from '../../infrastructure/rest/model/company-admin.model';

@Component({
  selector: 'pd-change-password',
  templateUrl: './change-company-admin-password.component.html',
  styleUrl: './change-company-admin-password.component.css'
})
export class ChangeCopmanyAdminPasswordComponent implements OnInit {

  password: string = '';
  repeatedPassword: string = '';
  errors: any;
  @Input() companyAdmin!: CompanyAdmin;

  constructor(
    public dialog: MatDialogRef<ChangeCopmanyAdminPasswordComponent>,
    private authService: AuthService,
    private companyAdminService: CompanyAdminService,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.companyAdmin = data.companyAdmin;
    this.errors = {
      password: "",
      repeatedPassword: "",
    };
  }

  ngOnInit(): void {
    console.log(this.companyAdmin.password);
  }

  changePassword(): void {
    if (this.validate()) {
      
    }
  }

  validate(): boolean {
    let isValid = true;

    if (this.password == '' || this.repeatedPassword == '') {
      this.errors.password = 'Password must not be empty.'
      isValid = false;
    }
    if (this.password != this.repeatedPassword) {
      this.errors.password = 'Passwords not the same.'
      isValid = false;
    }

    return isValid;
  }

}
