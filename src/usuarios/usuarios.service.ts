import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  criar(dto: CreateUsuarioDto) {
    return this.prisma.usuario.create({ data: { nome: dto.nome } });
  }

  listar() {
    return this.prisma.usuario.findMany({ orderBy: { id: "asc" } });
  }

  async buscar(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      include: { vendas: true, compras: true, avaliacoesFeitas: true, avaliacoesRecebidas: true },
    });
    if (!usuario) throw new NotFoundException("Usuário não encontrado.");
    return usuario;
  }

  async atualizar(id: number, dto: UpdateUsuarioDto) {
    await this.exigirUsuario(id);
    return this.prisma.usuario.update({ where: { id }, data: dto });
  }

  async remover(id: number) {
    await this.exigirUsuario(id);
    return this.prisma.usuario.delete({ where: { id } });
  }

  private async exigirUsuario(id: number) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id }, select: { id: true } });
    if (!usuario) throw new NotFoundException("Usuário não encontrado.");
  }
}
