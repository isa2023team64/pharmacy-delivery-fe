import { Component, Inject } from '@angular/core';
import { faXmark, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../../infrastructure/rest/model/appointmen.model';
import { AppointmentService } from '../../infrastructure/rest/appointment.service';
import { AuthService } from '../../infrastructure/auth';
import { RegisteredUserService } from '../../infrastructure/rest/registered-user.service';
import { ReservationService } from '../../infrastructure/rest/reservation.service';

@Component({
  selector: 'pd-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  appointments: Appointment[] = []
  selectedAppointmentId: number = -1
  user: any
  userId: number = -1

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialogRef<ReservationComponent>,
    public appointmentService: AppointmentService,
    private authService: AuthService,
    private userService: RegisteredUserService,
    private reservationService: ReservationService
  ) {
    console.log(this.data)
  }

  ngOnInit(): void {
    this.getAppointments();
    this.fetchUser();
  }

  onClose(): void {
    this.dialog.close();
  }

  getAppointments(): void {
    this.appointmentService.getAppointmentsByCompanyId(this.data.companyId).subscribe({
      next: (result: Appointment[]) => {
        console.log(this.appointments)
        const currentDate = new Date();
        this.appointments = result.filter(appointment =>
          new Date(appointment.startDateTime) > currentDate && appointment.status === 'FREE');
      },
      error: () => {
        console.log("Error.")
      }
    });
  }

  selectAppointment(id: number): void {
    this.selectedAppointmentId = this.selectedAppointmentId == id ? -1 : id;
  }

  isSelected(id: number) {
    return id == this.selectedAppointmentId
  }

  onMakeAReservation(): void {
    const reservation = {
      userId: this.userId,
      equipmentIds: this.data.equipmentIds,
      appointmentId: this.selectedAppointmentId
    }
    console.log(reservation);
    this.reservationService.createReservation(reservation).subscribe({
      next: (result: any) => {
        console.log("Successfully made a reservation.");
        this.onClose();
      },
      error: () => {
        console.log("Error.")
      }
    });
  }

  fetchUser(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (!user.id) return;
      this.userId = user.id;
      this.userService.getById(this.userId).subscribe(registeredUser => {
        this.user = registeredUser;
      })
    });
  }

  faXmark = faXmark;
}
