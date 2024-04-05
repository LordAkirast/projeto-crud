import supertest from "supertest";
import app from '../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const data = {
    name: "testDelete",
    apartment: 9999,
    complement: "Test Delete",
    parkingSpot: true,
    housingType: "Rent"
}

beforeAll(async () => {
   // await prisma.tenants.deleteMany()
    await prisma.$executeRaw`TRUNCATE TABLE "tenants" RESTART IDENTITY` //gpt - it will resets ids from tenant to 1
    //console.log('Tenants IDs reseted!')
})

afterAll(async () => {
    await prisma.tenants.deleteMany()
    //console.log('Database Cleaned!')
})

describe("delete /delete", () => {
    it("given an existent id it shall return 204 and delete the file", async () => {

        await prisma.tenants.create({ data })

        const body = {
            id: 1
        }
        const result = (await supertest(app).delete("/delete").send(body));
        const status = result.status;

        expect(status).toEqual(204)




    })

    it("given an invalid id it shall return 404", async () => {

        const body = {
            id: 194238
        }
        const result = (await supertest(app).delete("/delete").send(body));
        const status = result.status;

        expect(status).toEqual(404)




    })

}) 