import axios from "axios";
import { API_AUTH } from "./config";


export const registerApi = (data) =>{
    return axios.post(`${API_AUTH}/register`,data);
}
export const loginApi = (data) =>{
    return axios.post(`${API_AUTH}/login`,data);
}
export const loadUserApi = (token)=>{
    return axios.get(`${API_AUTH}/me`,{
        headers:{
            Authorization:`Bearer ${token}`
        },
    });
};
