export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  active: boolean;
  lastPasswordResetDate: Date;
  city: string;
  country: string;
  phoneNumber: string;
  workplace: string;
  company: string;
}
