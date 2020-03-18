import Axios from "axios"

//'httpService' importing 'AuthService', and 'AuthService' importing 'httpService' causes bi-directional dependency. Which is not cool.
// So to avoid, create set method in Auth service instead of using its get method for JWT.
//import {getJwt} from "../services/authService"  

//Axios.defaults.headers.common["x-jwt"]=getJwt()

Axios.defaults.baseURL=process.env.REACT_APP_API_URL;

function setJWTinHeader(jwt){
    Axios.defaults.headers.common["x-jwt"]=jwt;
}

export default{
    get:Axios.get,
    post:Axios.post,
    put:Axios.put,
    delete:Axios.delete,
    setJWTinHeader
}