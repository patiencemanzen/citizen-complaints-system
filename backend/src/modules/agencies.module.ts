import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgenciesService } from '../services/agencies.service';
import { AgenciesController } from '../controllers/agencies.controller';
import { AgencySchema } from '../schemas/agencies.schema';
import { UsersModule } from './users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Agency', schema: AgencySchema }]),
    forwardRef(() => UsersModule),
  ],
  controllers: [AgenciesController],
  providers: [AgenciesService],
  exports: [AgenciesService],
})
export class AgenciesModule {}
