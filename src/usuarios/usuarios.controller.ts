import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { UsuariosService } from "./usuarios.service";

@Controller("usuarios")
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  @Post()
  criar(@Body() dto: CreateUsuarioDto) { return this.service.criar(dto); }

  @Get()
  listar() { return this.service.listar(); }

  @Get(":id")
  buscar(@Param("id", ParseIntPipe) id: number) { return this.service.buscar(id); }

  @Patch(":id")
  atualizar(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateUsuarioDto) {
    return this.service.atualizar(id, dto);
  }

  @Delete(":id")
  remover(@Param("id", ParseIntPipe) id: number) { return this.service.remover(id); }
}
