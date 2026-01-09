import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetTicketDTO {
  @IsString()
  @IsNotEmpty()
  film: string;

  @IsString()
  @IsNotEmpty()
  session: string;

  @IsOptional()
  @IsString()
  daytime?: string;

  @IsOptional()
  @IsString()
  day?: string;

  @IsOptional()
  @IsString()
  time?: string;

  @IsOptional()
  @IsString()
  hall?: string;

  @IsOptional()
  @IsNumber()
  rows?: number;

  @IsOptional()
  @IsNumber()
  seats?: number;

  @IsOptional()
  @IsNumber()
  price?: number;
}

export class GetOrderDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GetTicketDTO)
  tickets: GetTicketDTO[];
}

export class OrderResultDto {
  id: string;
  film: string;
  session: string;
  daytime: string;
  day: string;
  time: string;
  row: number;
  seat: number;
  price: number;
}

export interface ListResponse<T> {
  total: number;
  items: T[];
}

export type TicketDto = GetTicketDTO;
export type OrderFrontendDto = GetOrderDTO;
