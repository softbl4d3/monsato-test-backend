import { Body, Controller, Get, Param, Post, Req, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnerDto } from './dtos/owner.dto';
import { ResponseWrapper } from 'response-wrapper';
import { CreateOwnerDto } from './dtos/owner-create.dto';
import { ApiBody } from '@nestjs/swagger';
import { OwnerRespDto } from './dtos/owner-response.dto';

type TGetAllOwnersResponseData = { owners: Array<OwnerRespDto> };
type TGetAllOwnersResponse = ResponseWrapper<TGetAllOwnersResponseData>;
type TOneOwnerResponseData = {owner: OwnerRespDto};
type TOneOwnerResponse = ResponseWrapper<TOneOwnerResponseData>;

@Controller('owners')
export class OwnersController {
    constructor(private readonly ownerService: OwnersService){}

    @Get("")
    async getAll(): Promise<TGetAllOwnersResponse>{
        try{
            const ownerDtos = await this.ownerService.findAll();
            const owners = ownerDtos.map(OwnerRespDto.fromOwnerDto) 
            if(ownerDtos.length === 0){
                throw new HttpException(
                    ResponseWrapper.fromError("owners not found :("),
                    HttpStatus.NOT_FOUND
                );
            } 
            return ResponseWrapper.fromSuccess({owners : owners})
        }
        catch (error) {
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

    @Post("")
    @ApiBody({ type: CreateOwnerDto })
    async create(@Body() createOwner: CreateOwnerDto): Promise<TOneOwnerResponse>{
        try{
            const ownerDto = await this.ownerService.create(createOwner);
            const owner = OwnerRespDto.fromOwnerDto(ownerDto);
            return ResponseWrapper.fromSuccess({owner : owner})
        }
        catch (error) {
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

    @Get("by_name/:name")
    async getByName(@Param('name') name: string): Promise<TGetAllOwnersResponse>{
        try{
            const ownerDtos = await this.ownerService.findByName(name);
            const owners = ownerDtos.map(OwnerRespDto.fromOwnerDto) 
            if (owners.length === 0){
                throw new HttpException(
                    ResponseWrapper.fromError('No owners found with this name'),
                    HttpStatus.NOT_FOUND
                );
            }
            return ResponseWrapper.fromSuccess({owners: owners})
        }catch (error) {
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

    @Get("by_petId/:petId")
    async getByPetId(@Param('petId') petId: string): Promise<TGetAllOwnersResponse>{
        try {
            const ownerDtos = await this.ownerService.findByPetId(Number(petId))
            const owners = ownerDtos.map(OwnerRespDto.fromOwnerDto) 

            if (owners){
                return ResponseWrapper.fromSuccess({ owners: owners });
            }
            return ResponseWrapper.fromError('Что-то пошло не так...');
        }catch (error) {
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

    @Delete(":id")
    async removeOwnerById(@Param("id") id: string): Promise<TOneOwnerResponse>{
        try {
            const ownerDto = await this.ownerService.removeById(Number(id));
            const owner = OwnerRespDto.fromOwnerDto(ownerDto);
            if (owner != null){
                return ResponseWrapper.fromSuccess({ owner: owner });
            }
            throw new HttpException(
                 ResponseWrapper.fromError('не существует пользователя с таким Id'),
                 HttpStatus.NOT_FOUND
                )
        }catch (error) {
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
