import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OwnerEntity } from 'domain/entity/owner.entity';
import { PetEntity } from 'domain/entity/pet.entity';

@Module({
  controllers: [],
  exports: [TypeOrmModule],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (): TypeOrmModuleOptions => {
        return {
          type: 'sqlite',
          entities: [OwnerEntity, PetEntity],
          database: process.env.DB_FILE ?? './test.db',
          synchronize: true,
          autoLoadEntities: true,
          migrations: ['dist/migrations/*.js']
        };
      }
    })
  ],
  providers: [],
})
export class DatabaseModule { }
