import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

type userBody = {
    id: number;
    name: string;
    apartment: number;
    complement: string;
    parkingSpot: boolean;
    housingType: "Bought" | "Rent";
}


async function updateTenants(req: Request, res: Response) {

    const tenant = req.body as userBody;

    if (!tenant.name || tenant.name.trim() === "") {
        return res.status(400).json({ error: "O campo 'name' é obrigatório." });
    } else if (tenant.apartment == null || typeof tenant.apartment !== "number") {
        return res.status(400).json({ error: "O campo 'apartment' é obrigatório e deve ser numérico." });
    } else if (!tenant.complement || tenant.complement.trim() === "") {
        tenant.complement = 'N/A'
    } else if (typeof tenant.parkingSpot !== "boolean") {
        return res.status(400).json({ error: "O campo 'parkingSpot' deve ser do tipo booleano." });
    } else if (tenant.housingType !== "Bought" && tenant.housingType !== "Rent") {
        return res.status(400).json({ error: "O campo 'housingType' deve ser 'Bought' ou 'Rent'." });
    }


    const verifyTenant = await prisma.tenants.findFirst({
        where: { id: tenant.id },
    })

    const verifyTenantAp = await prisma.tenants.findFirst({
        where: { apartment: tenant.apartment },
    })

    if(verifyTenantAp) {
        return res.status(409).json("Error: Apartamento já alocado a outro usuário.")
    }

    if (!verifyTenant) {
        return res.status(404).json("Error: User ID não encontrado.")
    } else {
        ///console.log("ID: Passou pela verificação de ID já estar alocado.")

        try {

            const updateTenant = await prisma.tenants.update({
                where: { id: tenant.id },
                data: tenant ,
            });
            ///console.log("UPDATE: Dados atualizados!")
            return res.status(200).json({ tenant: updateTenant });

        } catch (error) {
            ///console.log("ERR UPDATE 1: Erro: ", error)
            return res.status(500).json({ error: "Ocorreu um erro ao atualizar o inquilino." });
        }
    }




}

export default updateTenants;