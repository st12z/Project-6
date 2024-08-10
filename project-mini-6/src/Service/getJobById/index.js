import { get } from "../../ulities";
export const getJobById=async (id) =>{
    const response =await get(`jobs?id=${id}`);
    return response;
}