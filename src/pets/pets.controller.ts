import { Controller, Get } from "@nestjs/common";
import { PetsService } from "./pets.service";

@Controller('pets')
export class PetsController {
  constructor(private petsService: PetsService) { }

  @Get('all')
  async getAll() {
    return await this.petsService.getAll();
  }
}
