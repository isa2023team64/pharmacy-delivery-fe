import { DatePipe } from "@angular/common";


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
}