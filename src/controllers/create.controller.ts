import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
///for next commit:
/// tipagem de dados.
/// npm i prisma and npx prisma init

type userBody = {
  id: number;
  name: string;
  apartment: number;
  complement: string;
  parkingSpot: boolean;
  housingType: "Bought" | "Rent";
}

export async function createTenant(req: Request, res: Response) {

  const tenant = req.body as userBody;

  if (!tenant.name || tenant.name.trim() === "") {
    return res.status(400).json({ error: "O campo 'name' é obrigatório." });
  } else if (tenant.apartment == null || typeof tenant.apartment !== "number" ) {
    return res.status(400).json({ error: "O campo 'apartment' é obrigatório e deve ser numérico." });
  } else if (!tenant.complement || tenant.complement.trim() === "") {
    tenant.complement = 'N/A'
  } else if (typeof tenant.parkingSpot !== "boolean") {
    return res.status(400).json({ error: "O campo 'parkingSpot' deve ser do tipo booleano." });
  } else if (tenant.housingType !== "Bought" && tenant.housingType !== "Rent") {
    return res.status(400).json({ error: "O campo 'housingType' deve ser 'Bought' ou 'Rent'." });
  }



  console.log("ID 1: Passou pela verificação de parkingSpot e HOusingTYpe.")

  const verifyTenant = await prisma.tenants.findFirst({
    where: { apartment: tenant.apartment },
  })


  if (verifyTenant) {
    return res.status(409).json("Error: Este apartamento já foi comprado ou alugado por um inquilino.")
  } else {
    console.log("ID 2: Passou pela verificação de apartamento já estar alocado.")

    try {

      const createdTenant = await prisma.tenants.create({ data: tenant });
      console.log("ID 3: Apartamento Alocado!")
      return res.status(201).json({ tenant: createdTenant });

    } catch (error) {
      console.log("ERR 1: Erro: ", error)
      return res.status(500).json({ error: "Ocorreu um erro ao criar o inquilino." });
    }
  }
}




///omit example:
///tenant<Omit, complement>

export default createTenant;