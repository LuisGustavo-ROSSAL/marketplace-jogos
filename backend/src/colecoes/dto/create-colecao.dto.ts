import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateColecaoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(120)
  nomeConsole!: string;

  @IsOptional()
  @IsNumber()
  preco?: number | null;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  condicao?: string | null;

  @IsOptional()
  @IsInt()
  ano?: number | null;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  descricao?: string | null;

  @IsOptional()
  @IsString()
  imagemUrl?: string | null;
}
