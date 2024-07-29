//isLoggedIn 
export const isLoggedIn =() =>{
    let data = localStorage.getItem("data");
    if(data == null) return false;
    else return true;
}

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