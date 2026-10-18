import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { UsuariosModule } from "./usuarios/usuarios.module";
import { ColecoesModule } from "./colecoes/colecoes.module";
import { VendasModule } from "./vendas/vendas.module";
import { AvaliacoesModule } from "./avaliacoes/avaliacoes.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsuariosModule,
    ColecoesModule,
    VendasModule,
    AvaliacoesModule,
  ],
})
export class AppModule {}
