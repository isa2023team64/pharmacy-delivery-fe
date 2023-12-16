import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../infrastructure/auth';
import { CompanyAdminService } from '../../infrastructure/rest/company-admin.service';
import { CompanyAdmin } from '../../infrastructure/rest/model/company-admin.model';
import { ChangePassword } from '../../infrastructure/auth/model/change-password.model';
import { Router } from '@angular/router';

@Component({
  selector: 'pd-change-password',
  templateUrl: './change-company-admin-password.component.html',
  styleUrl: './change-company-admin-password.component.css'
})
export class ChangeCopmanyAdminPasswordComponent implements OnInit {

  password: string = '';
  newPassword: string = '';
  errors: any;
  companyAdmin!: CompanyAdmin;

  constructor(
    public dialog: MatDialogRef<ChangeCopmanyAdminPasswordComponent>,
    private authService: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.companyAdmin = data.companyAdmin;
    this.errors = {
      password: "",
      newPassword: "",
    };
  }

  ngOnInit(): void {}

  changePassword(): void {
    if (this.validate()) {
      let cp: ChangePassword = {
        username: this.companyAdmin.email,
        password: this.password,
        newPassword: this.newPassword
      }
      this.authService.changePassword(cp, false).subscribe(() => {
        console.log('Password changed successfully!');
        location.reload();
      });
    }
  }

  validate(): boolean {
    let isValid = true;

    if (this.password == '' || this.newPassword == '') {
      this.errors.password = 'Password must not be empty.'
      isValid = false;
    }

    return isValid;
  }

}
