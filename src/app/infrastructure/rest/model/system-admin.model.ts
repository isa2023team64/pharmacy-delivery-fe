export class SystemAdmin {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    phoneNumber: string;
    firstLogged: boolean;

    constructor() {
      this.id = -1;
      this.email = "";
      this.password = "";
      this.firstName = "";
      this.lastName = "";
      this.city = "";
      this.country = "";
      this.phoneNumber = "";
      this.firstLogged = true;
    }
  }
