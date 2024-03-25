import supertest from "supertest";
import app from '../src/app';

describe("delete /delete", () => {
    it("given an existent id it shall return 204 and delete the file", async () => {

        const body = {
            id: 3
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