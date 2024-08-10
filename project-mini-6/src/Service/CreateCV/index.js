import { post } from "../../ulities";

export const CreateCV=async (data)=>{
    const response = post("cv",data);
    return response;
}
