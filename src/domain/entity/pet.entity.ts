import { PetDto } from "pets/dtos/pet.dto";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { OwnerEntity } from "./owner.entity";
@Entity({name: "pets"})
export class PetEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    type: string;
    @Column()
    breed: string;
    @Column({type: 'date'})
    birth_date: string;
    
    @ManyToMany(() => OwnerEntity, owner => owner.pets)
   owners?: OwnerEntity[];

  static fromDto(dto: PetDto): PetEntity {
    const entity = new PetEntity();
    entity.id = Number(dto.id);
    entity.name = dto.name;
    entity.type = dto.type;
    entity.breed = dto.breed;
    entity.birth_date = dto.birth_date;
    return entity;
  }
};