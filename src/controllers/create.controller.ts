import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient()



///colocar em pasta de schemas
const tenantSchema = Joi.object({
  name: Joi.string().required().min(3),
  apartment: Joi.number().required(),
  complement: Joi.string(),
  parkingSpot: Joi.boolean().required(),
  housingType: Joi.string().valid('Bought','Rent').required()
})


///colocar em protocols
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

  const {value, error} = tenantSchema.validate(tenant)
  if (error) {
    return res.status(422).send(error.details[0].message)
  }

  const verifyTenant = await prisma.tenants.findFirst({
    where: { apartment: tenant.apartment },
  })


  if (verifyTenant) {
    return res.status(409).json("Error: Este apartamento já foi comprado ou alugado por um inquilino.")
  } else {
    ///console.log("ID 2: Passou pela verificação de apartamento já estar alocado.")

    try {

      const createdTenant = await prisma.tenants.create({ data: tenant });
      ///console.log("ID 3: Apartamento Alocado!")
      return res.status(201).json({ tenant: createdTenant });


    } catch (error) {
      ///console.log("ERR 1: Erro: ", error)
      return res.status(500).json({ error: "Ocorreu um erro ao criar o inquilino." });
    }
  }
}




///omit example:
///tenant<Omit, complement>

export default createTenant;