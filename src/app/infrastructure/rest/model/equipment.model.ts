export class Equipment{
    id?: number;
    name: string;
    description: string;
    type: string;
    averageRating?:string;
    stockCount?: number;


    constructor(name: string, description: string, type: string) {
        this.name = name;
        this.description = description;
        this.type = type;
    }
}