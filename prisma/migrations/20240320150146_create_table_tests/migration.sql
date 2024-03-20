-- CreateTable
CREATE TABLE "testTable" (
    "name" TEXT NOT NULL,
    "number" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "testTable_pkey" PRIMARY KEY ("number")
);

-- CreateIndex
CREATE UNIQUE INDEX "testTable_name_key" ON "testTable"("name");
