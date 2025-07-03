import { PetEntity } from "domain/entity/pet.entity";
import { Column, Entity, IsNull, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "owners"})
export class OwnerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ collation: 'NOCASE' })
  name: string;

  @Column()
  phone: string;

  @ManyToMany(
    ()=> PetEntity,
    (pet) => pet.owners,
    {lazy: true}
)
  @JoinTable()
  pets?: PetEntity[]

}