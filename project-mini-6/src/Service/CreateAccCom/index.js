import { post } from "../../ulities"

export const CreateAccCom = async (data)=>{
    const response = await post("company",data);
    return response;
}