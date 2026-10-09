import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateVendaDto } from "./dto/create-venda.dto";
import { UpdateVendaDto } from "./dto/update-venda.dto";

const detalhesVenda = {
  item: true,
  vendedor: true,
  comprador: true,
  avaliacoes: true,
} as const;

@Injectable()
export class VendasService {
  constructor(private readonly prisma: PrismaService) {}

  criar(dto: CreateVendaDto) {
    return this.prisma.venda.create({
      data: {
        idColecao: dto.idColecao,
        idVendedor: dto.idVendedor,
        idComprador: dto.idComprador ?? null,
      },
      include: detalhesVenda,
    });
  }

  listar() {
    return this.prisma.venda.findMany({ include: detalhesVenda, orderBy: { id: "asc" } });
  }

  async buscar(id: number) {
    const venda = await this.prisma.venda.findUnique({ where: { id }, include: detalhesVenda });
    if (!venda) throw new NotFoundException("Venda não encontrada.");
    return venda;
  }

  async atualizar(id: number, dto: UpdateVendaDto) {
    await this.exigirVenda(id);
    return this.prisma.venda.update({
      where: { id },
      data: {
        idColecao: dto.idColecao,
        idVendedor: dto.idVendedor,
        idComprador: dto.idComprador,
      },
      include: detalhesVenda,
    });
  }

  async remover(id: number) {
    await this.exigirVenda(id);
    return this.prisma.venda.delete({ where: { id } });
  }

  private async exigirVenda(id: number) {
    const venda = await this.prisma.venda.findUnique({ where: { id }, select: { id: true } });
    if (!venda) throw new NotFoundException("Venda não encontrada.");
  }
}
