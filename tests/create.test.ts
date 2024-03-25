
import app from '../src/app';
import { SuperTest } from 'supertest';
import supertest = require('supertest');

describe("POST /create", () => {
    it("given a valid body it should return 201", async () => {
        const body = {
            name: "Test Man",
            apartment: 7890,
            complement: "Bloco UCM",
            parkingSpot: true,
            housingType: "Rent"
        };

        const result = await supertest(app).post("/create").send(body);
        const status = result.status;
        expect(status).toEqual(201);
    });

    it("given a valid body it should return 409 if the value already exists", async () => {
        const body = {
            name: "Test Man",
            apartment: 611,
            complement: "Bloco UCM",
            parkingSpot: true,
            housingType: "Rent"
        };

        const secondTry = await supertest(app).post("/create").send(body);
        expect(secondTry.status).toEqual(409);
    });
});
