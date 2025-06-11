import { Controller, Get } from "@nestjs/common";
import { PetsService } from "./pets.service";
import { PetDto } from "./dtos/pet.dto";
import { ResponseWrapper } from "../response-wrapper";

type TGetAllResponseData = { pets: Array<PetDto> };
type TGetAllResponse = ResponseWrapper<TGetAllResponseData>;

@Controller('pets')
export class PetsController {
  constructor(private petsService: PetsService) { }

  @Get('all')
  async getAll(): Promise<TGetAllResponse> {
    try {
      const petDtos = await this.petsService.getAll();

      return ResponseWrapper.fromSuccess({ pets: petDtos });
    } catch (error) {
      console.error(error);
      return ResponseWrapper.fromError('Что-то пошло не так...');
    }
  }
}
