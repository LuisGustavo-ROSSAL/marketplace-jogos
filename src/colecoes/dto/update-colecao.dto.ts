import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateColecaoDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  nomeConsole?: string;
}
