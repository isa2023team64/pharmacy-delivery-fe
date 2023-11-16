import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Registration } from '../model/registration.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pd-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('\\+\\d{12}')]),
    workplace: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
  });

  register(): void {
    const registration: Registration = {
      name: this.registrationForm.value.name || "",
      surname: this.registrationForm.value.surname || "",
      email: this.registrationForm.value.email || "",
      password: this.registrationForm.value.password || "",
      city: this.registrationForm.value.city || "", 
      country: this.registrationForm.value.country || "",
      phoneNumber: this.registrationForm.value.phoneNumber || "",
      workplace: this.registrationForm.value.workplace || "",
      company: this.registrationForm.value.company || "",
    };
    
    console.log("Registration Data:", registration);
    console.log("Uspesno registrovan korisnik111");
    if (this.registrationForm.valid) {
      
      console.log("Uspesno registrovan korisnik");
      /*this.authService.register(registration).subscribe({
        next: () => {
          this.router.navigate(['home']);
        },
      });*/
    }
}

}
