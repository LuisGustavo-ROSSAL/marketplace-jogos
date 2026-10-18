import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ColecoesService } from "./colecoes.service";
import { CreateColecaoDto } from "./dto/create-colecao.dto";
import { UpdateColecaoDto } from "./dto/update-colecao.dto";

@Controller("colecoes")
export class ColecoesController {
  constructor(private readonly service: ColecoesService) {}

  @Post()
  criar(@Body() dto: CreateColecaoDto) { return this.service.criar(dto); }

  @Get()
  listar() { return this.service.listar(); }

  @Get(":id")
  buscar(@Param("id", ParseIntPipe) id: number) { return this.service.buscar(id); }

  @Patch(":id")
  atualizar(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateColecaoDto) {
    return this.service.atualizar(id, dto);
  }

  @Delete(":id")
  remover(@Param("id", ParseIntPipe) id: number) { return this.service.remover(id); }
}
