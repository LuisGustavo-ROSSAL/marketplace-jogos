import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { AvaliacoesService } from "./avaliacoes.service";
import { CreateAvaliacaoDto } from "./dto/create-avaliacao.dto";

@Controller("avaliacoes")
export class AvaliacoesController {
  constructor(private readonly service: AvaliacoesService) {}

  @Post()
  criar(@Body() dto: CreateAvaliacaoDto) { return this.service.criar(dto); }

  @Get()
  listar() { return this.service.listar(); }

  @Get(":id")
  buscar(@Param("id", ParseIntPipe) id: number) { return this.service.buscar(id); }

  @Delete(":id")
  remover(@Param("id", ParseIntPipe) id: number) { return this.service.remover(id); }
}
