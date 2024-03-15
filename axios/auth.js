import axios from "axios"






export const getUser = async(email,password)=>{
    return await axios.post("http://192.168.1.2:8080/api/user/login",{
        email:email,
        password:password
    })
   } 


export const createUser = async(data)=>{
    return await axios.post("http://192.168.1.2:8080/api/user/insert",{
        email:data.email,
        password:data.password,
        name:data.name,
        registerNumber:data.registerNo
    })
   } 