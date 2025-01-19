export interface KibblesDTO {
    id: number;
    name: string;
    price: number;
    taste: string;
    imageURL: string;
    approvedByTokyo: boolean;
    tokyoOpinion?: string;
    humidity: number;
    calcium: number;
    rawAshes: number;
    rawProteins: number;
    rawFat: number;
    rawFibers: number;
    description: string;
    quantity: number;
}  