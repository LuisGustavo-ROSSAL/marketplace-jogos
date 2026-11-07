import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from "@nestjs/common";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { UsuariosService } from "./usuarios.service";

type AuthenticatedRequest = {
  user: { sub: number };
};

@Controller("usuarios")
export class UsuariosController {
  constructor(private readonly service: UsuariosService) {}

  @Post()
  criar(@Req() req: AuthenticatedRequest, @Body() dto: CreateUsuarioDto) {
    return this.service.criar(req.user.sub, dto);
  }

  @Get()
  listar(@Req() req: AuthenticatedRequest) {
    return this.service.listar(req.user.sub);
  }

  @Get(":id")
  buscar(@Req() req: AuthenticatedRequest, @Param("id", ParseIntPipe) id: number) {
    return this.service.buscar(req.user.sub, id);
  }

  @Patch(":id")
  atualizar(@Req() req: AuthenticatedRequest, @Param("id", ParseIntPipe) id: number, @Body() dto: UpdateUsuarioDto) {
    return this.service.atualizar(req.user.sub, id, dto);
  }

  @Delete(":id")
  remover(@Req() req: AuthenticatedRequest, @Param("id", ParseIntPipe) id: number) {
    return this.service.remover(req.user.sub, id);
  }
}
