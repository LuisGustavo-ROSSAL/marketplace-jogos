import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../src/generated/prisma/client';

const databaseUrl = process.env.DATABASE_URL ?? 'file:./dev.db';
const adminEmail = process.env.ADMIN_EMAIL?.trim();

if (!adminEmail) {
  throw new Error('Configure ADMIN_EMAIL no backend/.env antes de promover a conta.');
}

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: databaseUrl }),
});

async function promoverAdmin() {
  const usuario = await prisma.usuario.findUnique({
    where: { email: adminEmail },
    select: { id: true, email: true, role: true },
  });

  if (!usuario) {
    throw new Error('Conta não encontrada. Cadastre-se primeiro ou confira ADMIN_EMAIL e DATABASE_URL.');
  }

  if (usuario.role === 'ADMIN') {
    console.log(`A conta ${usuario.email} já é administradora.`);
    return;
  }

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { role: 'ADMIN' },
  });

  console.log(`A conta ${usuario.email} foi promovida a administradora.`);
}

promoverAdmin()
  .catch((erro: unknown) => {
    console.error('Não foi possível promover a conta:', erro);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
