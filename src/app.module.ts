import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { PetsModule } from './pets/pets.module';
import { OwnersModule } from './owners/owners.module';

@Module({
  controllers: [AppController],
  imports: [DatabaseModule, PetsModule, OwnersModule],
})
export class AppModule { }
