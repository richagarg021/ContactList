import { myAxios } from "./helper";

export const signup = (user) => {
    return myAxios.post('/register', user);
}

export const login=(user) =>{
    return myAxios.post('/login', user).then((response)=>response.data);
}