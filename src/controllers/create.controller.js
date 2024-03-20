export async function createTenant(req,res) {
  const { name, apartment, complement, parkingSpot, housingType } = req.body;

 // const user = await userService.createUser({ email, password });

 const tenant = {
    name,
    apartment,
    complement,
    parkingSpot,
    housingType
 }

  return res.status(201).json({tenant});
}