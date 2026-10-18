import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateColecaoDto } from "./dto/create-colecao.dto";
import { UpdateColecaoDto } from "./dto/update-colecao.dto";

@Injectable()
export class ColecoesService {
  constructor(private readonly prisma: PrismaService) {}

  criar(dto: CreateColecaoDto) {
    return this.prisma.colecao.create({ data: dto });
  }

  listar() {
    return this.prisma.colecao.findMany({ include: { transacoes: true }, orderBy: { id: "asc" } });
  }

  async buscar(id: number) {
    const colecao = await this.prisma.colecao.findUnique({
      where: { id }, include: { transacoes: true },
    });
    if (!colecao) throw new NotFoundException("Coleção não encontrada.");
    return colecao;
  }

  async atualizar(id: number, dto: UpdateColecaoDto) {
    await this.exigirColecao(id);
    return this.prisma.colecao.update({ where: { id }, data: dto });
  }

  async remover(id: number) {
    await this.exigirColecao(id);
    return this.prisma.colecao.delete({ where: { id } });
  }

  private async exigirColecao(id: number) {
    const item = await this.prisma.colecao.findUnique({ where: { id }, select: { id: true } });
    if (!item) throw new NotFoundException("Coleção não encontrada.");
  }
}
