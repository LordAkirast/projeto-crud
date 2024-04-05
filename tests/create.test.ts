
import app from '../src/app';
import { SuperTest } from 'supertest';
import supertest = require('supertest');
import { PrismaClient, tenants } from '@prisma/client';
import body from './factory/tenants.factory';
import createTenant from './factory/tenants.factory';
import { faker } from '@faker-js/faker';
import { number } from 'joi';

const prisma = new PrismaClient()

///criar uma factory | separar os ambientes de dev, UAT e prod
///fazer as partes dos ambientes, mexer em cada ambeinte separado e configurar isso.
///fazer testes de validações do schema
///arquitetura

beforeEach(async () => {
    //await prisma.tenants.deleteMany()
    await prisma.$executeRaw`TRUNCATE TABLE "tenants" RESTART IDENTITY` //gpt - it will resets ids from tenant to 1
})

afterAll(async () => {
    await prisma.tenants.deleteMany()
})


describe("POST /create", () => {
   
    it("given a valid body it should return 201", async () => {
        ///nao entendi, o exemplo contempla somente criar um usuário com factory se for para fazer um get, não entendi como se faz se for um post.
        const result = await supertest(app).post("/create").send(body);
        const status = result.status;

        function verifyBody() {
            expect(typeof body.apartment).toBe('number');
            expect(typeof body.name).toBe('string');
            expect(typeof body.parkingSpot).toBe('boolean');
            expect(typeof body.complement).toBe('string');
            expect(['Bought', 'Rent']).toContainEqual(body.housingType);
        }
        verifyBody()
        
        expect(typeof body.apartment).toBe('number')
        expect(status).toEqual(201);
    });

    it("given a valid body, it shall create the user and verify if the user was created on the database and return 200", async () => {
        await supertest(app).post("/create").send(body);

        const findCreatedTenant = prisma.tenants.findFirst({
            where: { id: 1 }
        })
        const id = (await findCreatedTenant).id
        const result = await supertest(app).get(`/read/${id}`);
        const status = result.status;
        expect(status).toEqual(200)
    })

    it("given a valid body it should return 409 if the value already exists", async () => {
        const firstTry = await supertest(app).post("/create").send(body);
        const secondTry = await supertest(app).post("/create").send(body);
        expect(secondTry.status).toEqual(409);
    });
});
