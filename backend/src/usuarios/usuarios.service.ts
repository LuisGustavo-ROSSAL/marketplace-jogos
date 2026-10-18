import { Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../database/prisma.service";
import { CreateUserDTO } from "../auth/dto/create-users-dto";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async criar(dto: CreateUsuarioDto) {
    const passwordHash = await bcrypt.hash(dto.senha, 10);
    return this.prisma.usuario.create({
      data: { nome: dto.nome, email: dto.email, passwordHash },
      omit: { passwordHash: true },
    });
  }

  findByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  async createUser(dto: CreateUserDTO) {
    const passwordHash = await bcrypt.hash(dto.passwordHash, 10);
    return this.prisma.usuario.create({
      data: { nome: dto.name, email: dto.email, passwordHash },
      omit: { passwordHash: true },
    });
  }

  listar() {
    return this.prisma.usuario.findMany({
      orderBy: { id: "asc" },
      omit: { passwordHash: true },
    });
  }

  async buscar(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      include: { vendas: true, compras: true, avaliacoesFeitas: true, avaliacoesRecebidas: true },
      omit: { passwordHash: true },
    });
    if (!usuario) throw new NotFoundException("Usuário não encontrado.");
    return usuario;
  }

  async atualizar(id: number, dto: UpdateUsuarioDto) {
    await this.exigirUsuario(id);
    return this.prisma.usuario.update({
      where: { id },
      data: dto,
      omit: { passwordHash: true },
    });
  }

  async remover(id: number) {
    await this.exigirUsuario(id);
    return this.prisma.usuario.delete({
      where: { id },
      omit: { passwordHash: true },
    });
  }

  private async exigirUsuario(id: number) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id }, select: { id: true } });
    if (!usuario) throw new NotFoundException("Usuário não encontrado.");
  }
}
