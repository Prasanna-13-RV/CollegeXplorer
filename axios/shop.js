import axios from "axios"



export const getShops = async( )=>{
 return await axios.get("http://192.168.1.2:8080/api/shop")
} 



export const createOrder = async(user,items,shop)=>{
    return await axios.post("http://192.168.1.2:8080/api/order/insert",{
        user:user,
        items:items,
        shopId:shop        
    })
   } 


   export const getOrders = async(user)=>{
    return await axios.get(`http://192.168.1.2:8080/api/order/user/${user}`)
   } 
   
   
   
export const updateOrder = async(id)=>{
    return await axios.put(`http://192.168.1.2:8080/api/order/update/${id}`)
   } 


   export const createAttendance = async(user,location,image)=>{
    return await axios.post("http://192.168.1.2:8080/api/attendance/insert",{
        user:user,
        location:location,
        image:image,
        status:true    
    })
   } 
