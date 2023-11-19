import { Component } from '@angular/core';
import { Equipment } from '../../infrastructure/rest/model/equipment.model';
import { EquipmentService } from '../../company/equipment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pd-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrl: './add-equipment.component.css'
})
export class AddEquipmentComponent {
  newEquipment: Equipment = new Equipment("", "", "");
  errors: any;

  constructor(private service: EquipmentService, private router: Router) {

    this.errors = {
      name: "",
      description: "",
      type: ""
    };
  }

  saveChanges(): void {
    if(this.validate()) {
      this.service.addNewEquipment(this.newEquipment).subscribe({
        next: (result: Equipment) => {
          this.router.navigate(['home']);
        },
        error: (errData) => {
          console.log(errData);
        }
      })
    }
    
  }

  validate(): boolean {
    let isValid = true;
    this.resetErrors()

    if (this.newEquipment.name === "") {
      this.errors.password = "Name is required.";
      isValid = false;
    }
    if (this.newEquipment.description === "") {
      this.errors.password = "Description is required.";
      isValid = false;
    }
    if (this.newEquipment.type === "") {
      this.errors.password = "Type is required.";
      isValid = false;
    }

    return isValid
  }

  resetErrors(): void {
    this.errors.name = "";
    this.errors.description = "";
    this.errors.type = "";
  };
}
