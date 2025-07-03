import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { PetDto } from "./dtos/pet.dto";
import { queryGetAllPets } from "./queries/get-all.query";
import { InjectRepository } from "@nestjs/typeorm";
import { PetEntity } from "domain/entity/pet.entity";

@Injectable()
export class PetsService {
  constructor(private dataSource: DataSource,
    @InjectRepository(PetEntity)
    private readonly petRepo : Repository<PetEntity>
  ) {}

  async getAll(): Promise<Array<PetDto>> {
    const rawPets = await queryGetAllPets(this.dataSource);
    const petDtos = (rawPets ?? []).map(PetDto.fromGetAllPet);

    return petDtos;
  }

  async getByOwnerId(ownerId: number): Promise<PetDto[]> {
    const pets = await this.petRepo.find({
      relations: ["owners"],
      where: {
        owners: {
          id: ownerId,
        }
      },

    });
    return pets?.map(PetDto.fromEntity)

}


}
