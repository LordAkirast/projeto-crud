import { Request, Response } from "express";

///for next commit:
/// tipagem de dados.
/// npm i prisma and npx prisma init

type userBody = {
  name: string;
  apartment: string;
  complement: string;
  parkingSpot: boolean;
  housingType: "Bought" | "Rent";
}

export async function createTenant(req: Request, res: Response) {
  const tenant = req.body as userBody;

  // const user = await userService.createUser({ email, password });

  return res.status(201).json({ tenant });
}



///omit example:
///tenant<Omit, complement>

export default createTenant;