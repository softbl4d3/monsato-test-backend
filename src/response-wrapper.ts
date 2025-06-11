import { ApiProperty } from "@nestjs/swagger";

export class ResponseWrapper<T> {
  @ApiProperty({ description: 'Статус ответа' })
  success: boolean;

  @ApiProperty({ description: 'Данные ответа', nullable: true })
  data: T | null;

  @ApiProperty({ description: 'Ошибка ответа', nullable: true })
  error: { message: string; } | null;

  static fromSuccess<T>(data: T): ResponseWrapper<T> {
    return new ResponseWrapper<T>(true, data, null);
  }

  static fromError<T>(message: string): ResponseWrapper<T> {
    return new ResponseWrapper<T>(false, null, { message });
  }

  private constructor(success: boolean, data: T | null, error: { message: string; } | null) {
    this.data = data;
    this.error = error;
    this.success = success;
  }
}
