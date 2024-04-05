import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function deleteTenant(req: Request, res: Response) {

    const tenantId = req.body.id;

    try {

        const idVerify = await prisma.tenants.findFirst({
            where: { id: tenantId }

        })
     

        if (!idVerify) {
           
            return res.status(404).send("User ID não encontrado.")
        } else {
           

            const deletion = await prisma.tenants.delete({
                where: { id: tenantId }
            })
            return res.status(204).send(`Usuário de ID ${tenantId} deletado com sucesso.`)
        }
    } catch (error) {
        return res.status(500).send(error)
    }



}

export default deleteTenant