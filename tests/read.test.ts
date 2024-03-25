import app from '../src/app';
import supertest from 'supertest';

describe("GET /read", () => {
    it("shall return the created users and return status 200", async () => {
        const result = await supertest(app).get("/read");
        const status = result.status;
        
        expect(status).toEqual(200);
    })
});