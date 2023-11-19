import { DatePipe } from "@angular/common";
import { CompanyAdministrator } from "../../infrastructure/auth/model/company-administrator.model";


export interface Company{
    id?: number;
    name: string;
    address: string;
    city: string;
    country: string;
    openingTime: string;
    closingTime: string;
    description: string;
    averageRating: number;
    companyAdministrators?: CompanyAdministrator[]
}