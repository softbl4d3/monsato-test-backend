import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerEntity } from '../domain/entity/owner.entity';
import { ILike, In, Repository } from 'typeorm';
import { OwnerDto } from './dtos/owner.dto';
import { CreateOwnerDto } from './dtos/owner-create.dto';
import { PetEntity } from 'domain/entity/pet.entity';
import { ClosureJunctionEntityMetadataBuilder } from 'typeorm/browser/metadata-builder/ClosureJunctionEntityMetadataBuilder.js';


@Injectable()
export class OwnersService {
    constructor(
        @InjectRepository(OwnerEntity)
        private readonly ownerRepo: Repository<OwnerEntity>,
        @InjectRepository(PetEntity)
        private readonly petRepo : Repository<PetEntity>
    ){}

    async findAll():Promise<OwnerDto[]> {
        const owners = await this.ownerRepo.find();
        return owners.map(OwnerDto.fromEntity);
    }

    async create(owner : CreateOwnerDto): Promise<OwnerDto>{
        let pets: PetEntity[] = [];

        if (owner.petsIds && owner.petsIds.length > 0) {
            pets = await this.petRepo.find({
                where: {
                id: In(owner.petsIds),
                },
            });
        }
        const ownerEntity = this.ownerRepo.create({
            name: owner.name,
            phone: owner.phone,
            pets,
            });
        const savedOwner = await this.ownerRepo.save(ownerEntity);

        return OwnerDto.fromEntity(savedOwner)
    }

    async findByName(nameOwner:string): Promise<OwnerDto[]>{
        try {
            const owners = await this.ownerRepo.find({
                where: {
                    name: ILike(`%${nameOwner}%`) //works only w/ Postgres :(
                }
            });
            return owners.map(OwnerDto.fromEntity);
        } catch (error) {
            console.error(error);
            return [];
        }
        
    }

    async findByPetId(petId: number): Promise<OwnerDto[]>{
        try{
            const pets = await this.petRepo.findBy({id: petId})
            if (pets.length > 0){
                const owners = await this.ownerRepo.find(
                {
                    where: {
                    pets: pets
                    }
                })
                return owners.map(OwnerDto.fromEntity) 
            }
            return []
            
        }catch(error){
            console.log(error)
            return []
        }
        
    }

    async removeById(ownerId : number): Promise<OwnerDto>{
        try{
            const owner = await this.ownerRepo.findOneBy({ id: ownerId });
            if (owner != null){
                await this.ownerRepo.remove(owner);
                return OwnerDto.fromEntity(owner);
            } else{
                throw new NotFoundException("Пользователь с таким Id не найден")
            }
        }
        catch(error){
            console.log(error);
            throw new NotFoundException("Пользователь с таким Id не найден");
        }
    }

}
