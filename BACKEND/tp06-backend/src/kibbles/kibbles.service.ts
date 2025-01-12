import { Injectable } from "@nestjs/common";
import { Kibbles } from "./interfaces/kibbles.interface";

import * as kibblesData from "./data/kibbles.json";

@Injectable()
export class KibblesService {
    private readonly kibbles: Kibbles[] = [];

    constructor() {
        this.kibbles = kibblesData as Kibbles[]; 
    }

    async findAll(): Promise<Kibbles[]> {
        return Promise.resolve(this.kibbles);
    }
}
