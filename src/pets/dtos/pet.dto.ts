import { ApiProperty } from "@nestjs/swagger";

export class PetDto {
  @ApiProperty({ description: 'Имя питомца' })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
