import { Component } from '@angular/core';
import { AuthService } from '../../infrastructure/auth';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
import { ActivatedRoute } from '@angular/router';
import { RegisteredUser } from '../../infrastructure/rest/model/registered-user.model';
import { AppointmentService } from '../../infrastructure/rest/appointment.service';
import { ReservationService } from '../../infrastructure/rest/reservation.service';
import { Appointment } from '../../infrastructure/rest/model/appointmen.model';

@Component({
  selector: 'pd-registered-user-appointments',
  templateUrl: './registered-user-appointments.component.html',
  styleUrl: './registered-user-appointments.component.css'
})
export class RegisteredUserAppointmentsComponent {
  userId: number = -1;
  user: RegisteredUser = new RegisteredUser();
  canEdit: boolean = false;
  appointments: Appointment[] = [];

  // appointmentsTryout = [
  //   {
  //     id: 1,
  //     startDateTime: '2023-12-15T18:34:14.026+01:00',
  //     duration: 30,
  //     status: 'PENDING',
  //     companyAdministratorFullName: 'John Doe',
  //     company: { name: 'ABC Pharmacy' }
  //   },
  //   {
  //     id: 2,
  //     startDateTime: '2023-12-16T10:00:00.000+01:00',
  //     duration: 45,
  //     status: 'APPROVED',
  //     companyAdministratorFullName: 'Jane Smith',
  //     company: { name: 'XYZ Pharmacy' }
  //   },
  //   // Add more appointments as needed
  // ];

  constructor(public appointmentService: AppointmentService,
              private authService: AuthService,
              private userService: RegisteredUserService,
              private reservationService: ReservationService,
              private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.fetchUser();
      this.getAppointments(this.userId);
    })
  }
  getAppointments(userId: number) {
    this.reservationService.getUserAppointmentsByUserId(userId).subscribe({
      next: (result: any) => {
        this.appointments = result;
        console.log("Appointments retrived succsessfuly");
      },
      error: (errData) => {
        console.log("Error: " + errData);
      }
    })
    
  }
  

  fetchUser(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user.id) return;
      this.userId = user.id;
      this.userService.getById(this.userId).subscribe(registeredUser => {
        this.user = registeredUser;
        console.log("USER");
        console.log(this.user)
      })
    });
  }
}
