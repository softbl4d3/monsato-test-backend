import { Module } from "@nestjs/common";
import { PetsController } from "./pets.controller";
import { PetsService } from "./pets.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetEntity } from "domain/entity/pet.entity";
@Module({
  imports: [TypeOrmModule.forFeature([PetEntity])],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule { }
