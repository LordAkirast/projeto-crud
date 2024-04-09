import tenantRepository from "../repositories/tenant.repository";
import userBody from "../protocols/test.protocols";


async function createTenantService(tenant: userBody) {
    ///services
    const verifyTenant = await tenantRepository.verifyTenantRepository(tenant)


    if (verifyTenant) {
        console.log(verifyTenant)
        throw new Error("Error: Este apartamento já foi comprado ou alugado por um inquilino.");
    }

    else {


        const createdTenant = await tenantRepository.createTenantRepository(tenant)


        return createdTenant;

        ///throw new Error("Ocorreu um erro ao criar o inquilino.");
        ///return res.status(500).json({ error: "Ocorreu um erro ao criar o inquilino." });
    }
    ///services 
}

export default createTenantService;