import { Controller, Get, Param } from "@nestjs/common";
import { KibblesService } from "./kibbles.service";
import { Kibble as KibblesModel } from '@prisma/client';


@Controller()
export class KibblesController {
    constructor(private readonly kibblesService: KibblesService) {}

    @Get('kibbles')
    async getAllKibbles(): Promise<KibblesModel[]> {
        return this.kibblesService.kibbles({});
    }

    @Get('kibbles/:id')
    async getKibblesByID(@Param('id') id: string): Promise<KibblesModel> {
        return this.kibblesService.kibble({ id: Number(id) });
    }
}