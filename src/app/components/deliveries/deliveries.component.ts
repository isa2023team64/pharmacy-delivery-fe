import { Component } from '@angular/core';
import { 
  faTruckMedical,
  faCalendarDay,
  faHospital,
  faCheck,
  faClock
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pd-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrl: './deliveries.component.css'
})
export class DeliveriesComponent {
  faTruckMedical = faTruckMedical;
  faCalendarDay = faCalendarDay;
  faHospital = faHospital;
  faCheck = faCheck;
  faClock = faClock;
}
