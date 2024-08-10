import { get } from "../../ulities";
export const getAllJobs = async() =>{
    const response = await get("jobs");
    return response;
}
