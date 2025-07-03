import { ApiProperty } from "@nestjs/swagger";
import { PetEntity } from "domain/entity/pet.entity";
import { TGetAllPet } from "pets/queries/get-all.query";

export class PetDto {
  @ApiProperty({ description: 'Дата рождения питомца' })
  birth_date: string;

  @ApiProperty({ description: 'Порода питомца' })
  breed: string;

  @ApiProperty({ description: 'ID питомца' })
  id: string; // NOTE: ID всегда строки

  @ApiProperty({ description: 'Имя питомца' })
  name: string;

  @ApiProperty({ description: 'Тип животного (cat, dog, etc.)' })
  type: string;

  

  static fromGetAllPet(rawPet: TGetAllPet): PetDto {
    return new PetDto(String(rawPet.id), rawPet.name, rawPet.type, rawPet.breed, rawPet.birth_date);
  }

  static fromEntity(pet : PetEntity): PetDto{
    return new PetDto(String(pet.id), pet.name, pet.type, pet.breed, pet.birth_date);
  }
  static toEntity(dto: PetDto): PetEntity { 
    return {
      id: Number(dto.id), 
      name: dto.name,
      type: dto.type,
      breed: dto.breed,
      birth_date: dto.birth_date,
    };
  }

  constructor(
    id: string,
    name: string,
    type: string,
    breed: string,
    birthDate: string,
  ) {
    this.birth_date = birthDate;
    this.breed = breed;
    this.id = id;
    this.name = name;
    this.type = type;
  }
}
