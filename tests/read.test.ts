import app from '../src/app';
import supertest from 'supertest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const data = {
    name: "TestRead",
    apartment: 999,
    complement: "Test Block",
    parkingSpot: true,
    housingType: "Rent"
}

beforeAll(async () => {
   // await prisma.tenants.deleteMany()
    await prisma.$executeRaw`TRUNCATE TABLE "tenants" RESTART IDENTITY` //gpt - it will resets ids from tenant to 1
    await prisma.tenants.create({ data })
    //console.log('User Created!')
})

afterAll(async () => {
    await prisma.tenants.deleteMany()
    //console.log('Database Cleaned!')
})


describe("GET /read", () => {
    it("shall return the created users and return status 200", async () => {
        const result = await supertest(app).get("/read");
        const status = result.status;
        expect(status).toEqual(200);
    })

    it("given an id, it shall return the created user and status 200", async () => {

        const findCreatedTenant = await prisma.tenants.findFirst({
            where: {apartment : 999}
        })

        const id = findCreatedTenant.id
        if (!id) {
            return '´Error: ${id} not found!´'
        }
        const result = await supertest(app).get(`/read/${id}`);
        const status = result.status;
        expect(status).toEqual(200)
    })
});