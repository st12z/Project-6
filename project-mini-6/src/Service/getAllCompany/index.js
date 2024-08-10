import { get } from "../../ulities";
export const getAllCompany = async() =>{
    const response = await get("company");
    return response;
}