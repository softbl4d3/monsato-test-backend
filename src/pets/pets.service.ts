import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { PetDto } from "./dtos/pet.dto";

@Injectable()
export class PetsService {
  constructor(private dataSource: DataSource) { }

  async getAll(): Promise<Array<PetDto>> {
    const eee = await this.dataSource.sql``;
    console.log(eee);

    return [];
  }
}
