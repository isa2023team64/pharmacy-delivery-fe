import { Component, Input } from '@angular/core';
import { Equipment } from '../../infrastructure/rest/model/equipment.model';
import { 
  faFilter,
  faXmark, 
  faChevronDown,
  faArrowUpWideShort,
  faArrowDownWideShort,
  faChevronLeft,
  faChevronRight,
  faLocationDot,
  faStar,
  faClock,
  faBoxOpen
 } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'pd-equipment-card',
  templateUrl: './equipment-card.component.html',
  styleUrl: './equipment-card.component.css'
})
export class EquipmentCardComponent {
  
  faFilter = faFilter;
  faXmark = faXmark;
  faChevronDown = faChevronDown;
  faArrowUpWideShort = faArrowUpWideShort;
  faArrowDownWideShort = faArrowDownWideShort;
  faChevronLeft= faChevronLeft;
  faChevronRight = faChevronRight;
  faLocationDot = faLocationDot;
  faStar = faStar;
  faClock = faClock;
  faBoxOpen = faBoxOpen;

  @Input() equipment!: Equipment;
  @Input() selected: boolean = false;
}
