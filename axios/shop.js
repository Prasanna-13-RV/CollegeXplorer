import axios from "axios"



export const getShops = async( )=>{
 return await axios.get("http://192.168.1.4:8080/api/shop")
} 



export const createOrder = async(user,items)=>{
    return await axios.post("http://192.168.1.4:8080/api/order/insert",{
        user:user,
        items:items        










    })
   } 