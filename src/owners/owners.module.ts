import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerEntity } from '../domain/entity/owner.entity';
import { PetEntity } from 'domain/entity/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerEntity, PetEntity])],
  providers: [OwnersService],
  controllers: [OwnersController]
})
export class OwnersModule {}
