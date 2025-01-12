import { Controller, Get, UseGuards} from '@nestjs/common';
import { KibblesService } from './kibbles.service';
import { Kibbles } from './interfaces/kibbles.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('kibbles')
export class KibblesController {
  constructor(private readonly kibblesService: KibblesService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<Kibbles[]> {
    return this.kibblesService.findAll();
  }
}