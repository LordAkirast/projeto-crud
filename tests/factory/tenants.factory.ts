import { Prisma } from "@prisma/client";
import { PrismaClient} from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()


////entendi como criar a função e aplicar faker nela, mas não entendi direito qual a sintaxe para mandar ela com supertest e post

async function createTenant(name: string, apartment: number, complement: string, parkingSpot: boolean, housingType: string) {
  return prisma.tenants.create({
    data: {
        name, 
        apartment, 
        complement,
        parkingSpot,
        housingType
    }
  })
}


const body = {
    name: faker.name.firstName(),
    apartment: faker.datatype.number(),
    complement: faker.lorem.word(),
    parkingSpot: faker.datatype.boolean(),
    housingType: faker.helpers.arrayElement(['Rent', 'Bought'])
};




///criar uma factory
export default body