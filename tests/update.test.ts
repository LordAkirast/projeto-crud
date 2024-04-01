import app from '../src/app';
import supertest from 'supertest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const data = {
    name: "TestUpdate - 1",
    apartment: 9999,
    complement: "Test Update",
    parkingSpot: true,
    housingType: "Rent"
}

const datatwo = {
    id: 9999,
    name: "TestUpdate - 2",
    apartment: 99999,
    complement: "Test Update",
    parkingSpot: true,
    housingType: "Rent"
}

beforeAll(async () => {
    await prisma.tenants.deleteMany()
    await prisma.$executeRaw`TRUNCATE TABLE "tenants" RESTART IDENTITY` //gpt - it will resets ids from tenant to 1
    console.log('Tenants IDs reseted!')
})

afterAll(async () => {
    await prisma.tenants.deleteMany()
    console.log('Database Cleaned!')
})


describe("PATCH /update", () => {
    it("Given and ID and a valid body that exists it shall return 200", async () => {

        await prisma.tenants.create({ data })

        const body = {
            id: 1,
            name: "Test Man - Update",
            apartment: 919,
            complement: "Update Test",
            parkingSpot: true,
            housingType: "Rent"
        }

        const result = await supertest(app).patch("/update").send(body)
        const status = result.status;
        expect(status).toEqual(200);


    })

    it("Given an non existent ID it shall return 404", async () => {

        const result = await supertest(app).patch("/update").send(datatwo)
        const status = result.status;
        expect(status).toEqual(404);

    })
})