import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateVendaDto } from "./dto/create-venda.dto";
import { UpdateVendaDto } from "./dto/update-venda.dto";
import { VendasService } from "./vendas.service";

@Controller("vendas")
export class VendasController {
  constructor(private readonly service: VendasService) {}

  @Post()
  criar(@Body() dto: CreateVendaDto) { return this.service.criar(dto); }

  @Get()
  listar() { return this.service.listar(); }

  @Get(":id")
  buscar(@Param("id", ParseIntPipe) id: number) { return this.service.buscar(id); }

  @Patch(":id")
  atualizar(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateVendaDto) {
    return this.service.atualizar(id, dto);
  }

  @Delete(":id")
  remover(@Param("id", ParseIntPipe) id: number) { return this.service.remover(id); }
}
