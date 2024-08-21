import {jwtDecode} from "jwt-decode"


export const isLoggedIn = () => {
    const token = localStorage.getItem("data");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; 
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("data");        
        return false;
      }
      return true;
    }
    return false;
  };

//doLogin=> token=> set to localstorage

export const doLogin = (token, next) => {
    localStorage.setItem("data", token);
    next();
};

//doLogout => remove token from localStorage

export const doLogout =(next) =>{
    if(isLoggedIn){
    localStorage.removeItem("data");
    }
    next();
}