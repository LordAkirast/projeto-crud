import app from '../src/app';
import supertest from 'supertest';



///configurar para receber id por params. tem que mudar a rota de read.
describe("GET /read", () => {
    it("shall return the created users and return status 200", async () => {
        const result = await supertest(app).get("/read");
        const status = result.status;
        expect(status).toEqual(200);
    })

    it("given an id, it shall return the created user and status 200", async () => {
        const result = await supertest(app).get("/read/:id");
        const status = result.status;
        expect(status).toEqual(200)
    })
});