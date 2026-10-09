import { IsInt, IsOptional, Min } from "class-validator";

export class UpdateVendaDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  idColecao?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  idVendedor?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  idComprador?: number | null;
}
