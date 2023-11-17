import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Company } from '../../infrastructure/company/model/company.model';
import { AuthService } from '../../infrastructure/auth/auth.service';
import { Router } from '@angular/router';
import { Time } from '@angular/common';

@Component({
  selector: 'pd-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Correct the styleUrl to styleUrls
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrationForm = new FormGroup({

    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    openingTime: new FormControl('', [Validators.required]),
    closingTime: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    averageRating: new FormControl(0, [Validators.required]),
  });

    register(): void {

        const company: Company = {
            name: this.registrationForm.value.name || "",
            address: this.registrationForm.value.name || "",
            city: this.registrationForm.value.city || "",
            country: this.registrationForm.value.country || "",
            openingTime: this.registrationForm.value.openingTime || "",
            closingTime: this.registrationForm.value.closingTime || "",
            description: this.registrationForm.value.description || "",
            averageRating: this.registrationForm.value.averageRating || 0            
        }
    
        

    }



}
