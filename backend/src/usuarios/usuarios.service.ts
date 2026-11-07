import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../database/prisma.service";
import { CreateUserDTO } from "../auth/dto/create-users-dto";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async criar(actorId: number, dto: CreateUsuarioDto) {
    await this.exigirAdmin(actorId);
    const passwordHash = await bcrypt.hash(dto.senha, 10);
    return this.prisma.usuario.create({
      data: { nome: dto.nome, email: dto.email, passwordHash },
      select: { id: true, nome: true, email: true, role: true },
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

  async listar(actorId: number) {
    await this.exigirAdmin(actorId);
    return this.prisma.usuario.findMany({
      orderBy: { id: "asc" },
      select: { id: true, nome: true, email: true, role: true },
    });
  }

  async buscar(actorId: number, id: number) {
    await this.exigirUsuarioOuAdmin(actorId, id);
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: { id: true, nome: true, email: true, role: true },
    });
    if (!usuario) throw new NotFoundException("Usuário não encontrado.");
    return usuario;
  }

  async atualizar(actorId: number, id: number, dto: UpdateUsuarioDto) {
    await this.exigirUsuarioOuAdmin(actorId, id);
    await this.exigirUsuario(id);

    if (dto.email) {
      const usuarioComEmail = await this.prisma.usuario.findUnique({
        where: { email: dto.email },
        select: { id: true },
      });
      if (usuarioComEmail && usuarioComEmail.id !== id) {
        throw new ConflictException("Este email já está cadastrado.");
      }
    }

    return this.prisma.usuario.update({
      where: { id },
      data: dto,
      select: { id: true, nome: true, email: true, role: true },
    });
  }

  async remover(actorId: number, id: number) {
    await this.exigirAdmin(actorId);
    if (actorId === id) {
      throw new ConflictException("Não é possível excluir a própria conta pela administração.");
    }

    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: {
        role: true,
        _count: {
          select: {
            avaliacoesFeitas: true,
            avaliacoesRecebidas: true,
            anuncios: true,
            vendas: true,
            compras: true,
          },
        },
      },
    });
    if (!usuario) throw new NotFoundException("Usuário não encontrado.");

    if (usuario.role === "ADMIN") {
      const totalAdministradores = await this.prisma.usuario.count({ where: { role: "ADMIN" } });
      if (totalAdministradores <= 1) {
        throw new ConflictException("O último administrador não pode ser excluído.");
      }
    }

    const { avaliacoesFeitas, avaliacoesRecebidas, anuncios, vendas, compras } = usuario._count;
    if (avaliacoesFeitas + avaliacoesRecebidas + anuncios + vendas + compras > 0) {
      throw new ConflictException("Este usuário possui anúncios, vendas ou avaliações vinculadas e não pode ser excluído.");
    }

    return this.prisma.usuario.delete({
      where: { id },
      select: { id: true, nome: true, email: true, role: true },
    });
  }

  private async exigirAdmin(actorId: number) {
    const actor = await this.prisma.usuario.findUnique({
      where: { id: actorId },
      select: { role: true },
    });
    if (actor?.role !== "ADMIN") {
      throw new ForbiddenException("Acesso permitido somente para administradores.");
    }
  }

  private async exigirUsuarioOuAdmin(actorId: number, targetId: number) {
    if (actorId === targetId) return;
    await this.exigirAdmin(actorId);
  }

  private async exigirUsuario(id: number) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id }, select: { id: true } });
    if (!usuario) throw new NotFoundException("Usuário não encontrado.");
  }
}
