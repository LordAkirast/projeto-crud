
import app from '../src/app';
import { SuperTest } from 'supertest';
import supertest = require('supertest');
import { PrismaClient } from '@prisma/client';
import body from "../src/protocols/test.protocols"

const prisma = new PrismaClient()

beforeEach(async () => {
    await prisma.tenants.deleteMany()
    console.log('Database cleaned!')
})


describe("POST /create", () => {
    it("given a valid body it should return 201", async () => {
        const result = await supertest(app).post("/create").send(body);
        const status = result.status;
        expect(status).toEqual(201);
    });

    it("given a valid body it should return 409 if the value already exists", async () => {
        const firstTry = await supertest(app).post("/create").send(body);
        const secondTry = await supertest(app).post("/create").send(body);
        expect(secondTry.status).toEqual(409);
    });
});
