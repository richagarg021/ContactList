import axios from "axios";

export const BASE_URL = "http://localhost:8080";

export const myAxios = axios.create({
    baseURL : BASE_URL,
    
});

export const UserAxios = axios.create({
    baseURL : BASE_URL,
});

UserAxios.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem("data");
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        console.log(config.headers['Authorization']);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);