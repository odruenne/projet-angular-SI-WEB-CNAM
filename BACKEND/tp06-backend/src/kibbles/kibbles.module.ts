import { Module } from '@nestjs/common';
import { KibblesController } from './kibbles.controller.';
import { KibblesService } from './kibbles.service';


@Module({
  controllers: [KibblesController],
  providers: [KibblesService],
})
export class KibblesModule {}