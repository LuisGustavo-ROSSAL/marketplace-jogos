import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { CreateAvaliacaoDto } from "./dto/create-avaliacao.dto";

const detalhesAvaliacao = {
  venda: true,
  comprador: true,
  vendedor: true,
} as const;

@Injectable()
export class AvaliacoesService {
  constructor(private readonly prisma: PrismaService) {}

  criar(dto: CreateAvaliacaoDto) {
    return this.prisma.avaliacaoComprador.create({
      data: { idVenda: dto.idVenda, idUsuario: dto.idUsuario, idVendor: dto.idVendor },
      include: detalhesAvaliacao,
    });
  }

  listar() {
    return this.prisma.avaliacaoComprador.findMany({
      include: detalhesAvaliacao,
      orderBy: { id: "asc" },
    });
  }

  async buscar(id: number) {
    const avaliacao = await this.prisma.avaliacaoComprador.findUnique({
      where: { id }, include: detalhesAvaliacao,
    });
    if (!avaliacao) throw new NotFoundException("Avaliação não encontrada.");
    return avaliacao;
  }

  async remover(id: number) {
    const avaliacao = await this.prisma.avaliacaoComprador.findUnique({
      where: { id }, select: { id: true },
    });
    if (!avaliacao) throw new NotFoundException("Avaliação não encontrada.");
    return this.prisma.avaliacaoComprador.delete({ where: { id } });
  }
}
