import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  nome?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(254)
  email?: string;
}
