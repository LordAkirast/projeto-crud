-- CreateTable
CREATE TABLE "tenants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "apartment" INTEGER NOT NULL,
    "complement" TEXT NOT NULL,
    "parkingSpot" BOOLEAN NOT NULL,
    "housingType" TEXT NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_apartment_key" ON "tenants"("apartment");
