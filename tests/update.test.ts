import app from '../src/app';
import supertest from 'supertest';



describe("PATCH /update", () => {
    it("Given and ID and a valid body that exists it shall return 200", async () => {


        const body = {
            id: 2,
            name: "Test Man",
            apartment: 5,
            complement: "Bloco UMC",
            parkingSpot: true,
            housingType: "Rent"
        }

        const result = await supertest(app).patch("/update").send(body)
        const status = result.status;
        expect(status).toEqual(200);


    })

    it("Given an non existent ID it shall return 404", async () => {
        const body = {
            id: 19999,
            name: "Test Man",
            apartment: 23,
            complement: "Bloco UMC",
            parkingSpot: true,
            housingType: "Rent"
        }


        const result = await supertest(app).patch("/update").send(body)
        const status = result.status;
        expect(status).toEqual(404);

    })
})