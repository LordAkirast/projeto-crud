import Joi from "joi"


///colocar em pasta de schemas
const tenantSchema = Joi.object({
    name: Joi.string().required().min(3),
    apartment: Joi.number().required(),
    complement: Joi.string(),
    parkingSpot: Joi.boolean().required(),
    housingType: Joi.string().valid('Bought','Rent').required()
  })

  const tenantSchemaUpdate = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required().min(3),
    apartment: Joi.number().required(),
    complement: Joi.string(),
    parkingSpot: Joi.boolean().required(),
    housingType: Joi.string().valid('Bought','Rent').required()
  })
  
  export { tenantSchema, tenantSchemaUpdate };