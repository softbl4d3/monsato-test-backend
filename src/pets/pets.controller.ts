import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
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

  @Get('by_ownerId/:ownerId')
  async getPetByOwnerId(@Param('ownerId') ownerId: string): Promise<TGetAllResponse>{
    try {
      const petDtos = await this.petsService.getByOwnerId(Number(ownerId))
      if (petDtos.length <= 0){
        throw new HttpException(
          ResponseWrapper.fromError('pets not found'),
          HttpStatus.NOT_FOUND
        )
      }
      return ResponseWrapper.fromSuccess({ pets: petDtos });
    } catch (error) {
            console.error(error);
            if (error instanceof HttpException) {
                throw error;
            }
            console.error(error);
            throw new HttpException(
                ResponseWrapper.fromError('Internal Server Error'),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
    }
  }
}
