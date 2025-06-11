import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  controllers: [AppController],
  imports: [DatabaseModule],
})
export class AppModule { }
