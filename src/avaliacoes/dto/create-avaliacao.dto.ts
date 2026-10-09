import { IsInt, Min } from "class-validator";

export class CreateAvaliacaoDto {
  @IsInt()
  @Min(1)
  idVenda!: number;

  @IsInt()
  @Min(1)
  idUsuario!: number;

  @IsInt()
  @Min(1)
  idVendor!: number;
}
