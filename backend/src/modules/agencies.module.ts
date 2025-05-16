import { Module } from '@nestjs/common';
import { AgenciesService } from '../services/agencies.service';
import { AgenciesController } from '../controllers/agencies.controller';

@Module({
  controllers: [AgenciesController],
  providers: [AgenciesService],
  exports: [AgenciesService],
})
export class AgenciesModule {}
