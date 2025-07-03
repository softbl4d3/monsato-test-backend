import { ApiProperty } from "@nestjs/swagger";
import { OwnerEntity } from "domain/entity/owner.entity";
import { PetDto } from "pets/dtos/pet.dto";

export class OwnerDto {
    
  @ApiProperty({ description: 'ID владельца' })
  id: string; 

  @ApiProperty({ description: 'Имя владельца' })
  name: string;

  @ApiProperty({ description: 'Номер владельца' })
  phone: string;

  @ApiProperty({description: 'Питомцы у этого владельца'})
  pets?: PetDto[]
  static fromEntity(rawOwner: OwnerEntity): OwnerDto {
  const petsDto: PetDto[] = Array.isArray(rawOwner.pets)
        ? rawOwner.pets.map(pet => PetDto.fromEntity(pet))
        : [];

    return new OwnerDto(
        String(rawOwner.id),
        rawOwner.name,
        rawOwner.phone,
        petsDto,
    );
    }

    static toEntity(dto: OwnerDto): OwnerEntity {
    const entity = new OwnerEntity();
    entity.id = Number(dto.id);
    entity.name = dto.name;
    entity.phone = dto.phone;

    entity.pets = dto.pets?.map(PetDto.toEntity) ?? [];

    return entity;
    }
  constructor();
  constructor(id: string, name: string, phone: string, pets?: PetDto[]);
  constructor(
    id?: string,
    name?: string,
    phone?: string,
    pets?: PetDto[],
  ) {
    this.id = id ?? '';
    this.name = name ?? '';
    this.phone = phone ?? '';
    this.pets = pets;
  }
  
}
