import { DataSource } from "typeorm";

export type TGetAllPet = {
  id: number;
  name: string;
  type: string;
  breed: string;
  birth_date: string;
};

export async function queryGetAllPets(dataSource: DataSource): Promise<Array<TGetAllPet>> {
  return await dataSource.query<Array<TGetAllPet>>(`SELECT * FROM pets`);
}
