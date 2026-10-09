-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Colecao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeConsole" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Venda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idColecao" INTEGER NOT NULL,
    "idVendedor" INTEGER NOT NULL,
    "idComprador" INTEGER,
    CONSTRAINT "Venda_idColecao_fkey" FOREIGN KEY ("idColecao") REFERENCES "Colecao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Venda_idVendedor_fkey" FOREIGN KEY ("idVendedor") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Venda_idComprador_fkey" FOREIGN KEY ("idComprador") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AvaliacaoComprador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idVenda" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idVendor" INTEGER NOT NULL,
    CONSTRAINT "AvaliacaoComprador_idVenda_fkey" FOREIGN KEY ("idVenda") REFERENCES "Venda" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AvaliacaoComprador_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AvaliacaoComprador_idVendor_fkey" FOREIGN KEY ("idVendor") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
