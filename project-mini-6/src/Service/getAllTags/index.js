import { get } from "../../ulities";
export const getAllTags = async() =>{
    const response = await get("tags");
    return response;
}