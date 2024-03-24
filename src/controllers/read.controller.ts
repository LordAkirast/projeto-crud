import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()


async function readTenants(req: Request, res: Response) {

    try {
        const readTenant = await prisma.tenants.findMany()
        return res.status(200).send(readTenant)
    } catch (error) {
        return res.status(500).send("Ocorreu um erro: " + error)
    }

}

export default readTenants;