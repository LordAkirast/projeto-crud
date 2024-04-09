import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";
import { tenantSchema } from "../schemas/tenants.schemas";
import userBody from "../protocols/test.protocols";
import createTenantService from "../services/create.service";

const prisma = new PrismaClient()


/// o que eu não sei?
///como identificar e separar em routers, services etc...


///routers só vai fazer a parte de pegar a rota, o endpoint dela e chamar o controller. 
///as funções CRUD, se forem do mesmo modelo, devem ficar no mesmo arquivo de controller


export async function createTenant(req: Request, res: Response) {

  const tenant = req.body as userBody;

  ///middleware
  const { value, error } = tenantSchema.validate(tenant)
  if (error) {
    return res.status(422).send(error.details[0].message)
  }
  ///middleware
  try {

    const result = createTenantService(tenant)
    res.status(201).send(result)

  } catch (error) {
    console.log('bbbbbbbbbbbbbbbbbb')
    res.status(500).send(error.message)

  }

}


///omit example:
///tenant<Omit, complement>

export default createTenant;