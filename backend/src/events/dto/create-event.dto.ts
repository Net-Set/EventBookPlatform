import { IsString, IsNotEmpty, IsDateString, IsNumber, IsPositive, IsOptional, IsUrl } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsPositive()
  capacity: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}