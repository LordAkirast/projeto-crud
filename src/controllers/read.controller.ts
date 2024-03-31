import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()


export async function readTenants(req: Request, res: Response) {

    try {
        const readTenant = await prisma.tenants.findMany()
        return res.status(200).send(readTenant)
    } catch (error) {
        return res.status(500).send("Ocorreu um erro: " + error)
    }

}

export async function readTenant(req: Request, res: Response) {

    let idStr = req.params.id
    let id = parseInt(idStr);

    
    if (isNaN(id)) {
        return res.status(404).send('Registro não encontrado!');
    }


    try {
        const readTenant = await prisma.tenants.findFirst({
            where: { id: id }

        })
        return res.status(200).send(readTenant)


    } catch (error) {
        return res.status(500).send("Ocorreu um erro: " + error)
    }

}
 