////coisas que criam ou mexem com o banco

import userBody from "../protocols/test.protocols";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


async function createTenantRepository(tenant: userBody) {

    return await prisma.tenants.create({ data: tenant });

}

async function verifyTenantRepository(tenant: userBody) {

    return await prisma.tenants.findFirst({
        where: { apartment: tenant.apartment },
    })

}

export default {createTenantRepository, verifyTenantRepository};