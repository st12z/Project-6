import { get } from "../../ulities";

export const CheckEmailExist=async(email)=>{
    const response = await get(`company?email=${email}`);
    return response;
}
export const CheckPhoneExist=async(phone)=>{
    const response = await get(`company?email=${phone}`);
    return response;
}