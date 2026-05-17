-- CreateTable
CREATE TABLE "Recados" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "lido" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Recados_pkey" PRIMARY KEY ("id")
);
