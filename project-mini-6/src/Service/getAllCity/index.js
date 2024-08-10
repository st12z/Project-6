import { get } from "../../ulities";
export const getAllCity = async() =>{
    const response = await get("city");
    return response;
}