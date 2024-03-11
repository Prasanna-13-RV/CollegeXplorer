import axios from "axios"






export const getUser = async(email,password)=>{
    return await axios.post("http://192.168.1.4:8080/api/user",{
        email:email,
        password:password
    })
   } 


export const createUser = async(email,password)=>{
    return await axios.post("http://192.168.1.4:8080/api/user/insert",{
        email:email,
        password:password
    })
   } 