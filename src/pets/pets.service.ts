import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { PetDto } from "./dtos/pet.dto";
import { queryGetAllPets } from "./queries/get-all.query";

@Injectable()
export class PetsService {
  constructor(private dataSource: DataSource) { }

  async getAll(): Promise<Array<PetDto>> {
    const rawPets = await queryGetAllPets(this.dataSource);
    const petDtos = (rawPets ?? []).map(PetDto.fromGetAllPet);

    return petDtos;
  }
}
