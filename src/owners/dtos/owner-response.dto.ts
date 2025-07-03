import { OwnerDto } from "./owner.dto";

export class OwnerRespDto {
  id: string;
  name: string;
  phone: string;

  static fromOwnerDto(ownerDto: OwnerDto): OwnerRespDto {
    return {
      id: ownerDto.id,
      name: ownerDto.name,
      phone: ownerDto.phone,
    };
  }
}