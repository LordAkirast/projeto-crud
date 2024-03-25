
import app from './app';
import { SuperTest } from 'supertest';
import supertest = require('supertest');

describe("POST /create", () => {
    it("given a valid body it should return 201", async () => {
        const body = {
            name: "Test Man",
            apartment: "616",
            complement: "Bloco UCM",
            parkingSpot: true,
            housingType: "Rent"
        }

        const result = await supertest(app).post("/create").send(body);
        const status = result.status;
        
        expect(status).toEqual(201);
    });
});