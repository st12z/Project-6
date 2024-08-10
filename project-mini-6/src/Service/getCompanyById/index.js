import { get } from "../../ulities";

export const getCompanyById = async(id) =>{
    const response = await get(`company?id=${id}`);
    return response;
}