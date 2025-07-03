import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreateOwnerDto{
    @ApiProperty({description: "имя владельца животного"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Номер телефона' })
    @IsPhoneNumber() 
    phone: string;

    @ApiProperty({ description: 'ID питомцев', type: [Number]  })
    @IsArray()
    @IsNumber({},{each: true})
    petsIds?: number[];
}