export class Kibbles {
    id: number;
    name : string;
    pricePerKilo: number = 0;
    taste: string;
    imageURL: string;
    quantity: number = 1;
    totalPrice: number = this.pricePerKilo * this.quantity;
}