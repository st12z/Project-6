import { get } from "../../ulities";
const getAllCV = async() =>{
    const response = await get("cv");
    return response;
}