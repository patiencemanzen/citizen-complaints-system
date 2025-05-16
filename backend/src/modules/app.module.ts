import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { AgenciesModule } from './agencies.module';
import { ComplaintsModule } from './complaints.module';
import { RolesModule } from './roles.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.DATABASE_URL ??
        (() => {
          throw new Error('DATABASE_URL environment variable is not defined');
        })(),
    ),
    AuthModule,
    UsersModule,
    AgenciesModule,
    ComplaintsModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
