import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import userBody from "../protocols/test.protocols";
import { tenantSchemaUpdate } from "../schemas/tenants.schemas";

const prisma = new PrismaClient()

async function updateTenants(req: Request, res: Response) {

    const tenant = req.body as userBody;

    const { value, error } = tenantSchemaUpdate.validate(tenant)
    if (error) {
        return res.status(422).send(error.details[0].message)
    }

    const verifyTenant = await prisma.tenants.findFirst({
        where: { id: tenant.id },
    })

    const verifyTenantAp = await prisma.tenants.findFirst({
        where: { apartment: tenant.apartment },
    })

    if (verifyTenantAp) {
        return res.status(409).json("Error: Apartamento já alocado a outro usuário.")
    }

    if (!verifyTenant) {
        return res.status(404).json("Error: User ID não encontrado.")
    } else {

        try {

            const updateTenant = await prisma.tenants.update({
                where: { id: tenant.id },
                data: tenant,
            });
           
            return res.status(200).json({ tenant: updateTenant });

        } catch (error) {
           
            return res.status(500).json({ error: "Ocorreu um erro ao atualizar o inquilino." });
        }
    }




}

export default updateTenants;