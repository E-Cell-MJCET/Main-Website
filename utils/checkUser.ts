import { supabase } from "./supabase";

export const checkUser = async (email:string) =>{
    try{
        const {data,error} = await supabase
        .from("members")
        .select("email")
        .eq("email",email)
        .single()
        
        if (error){
            console.log(error)
        }
        
        return data ? true : false
    }
    catch (error:any){
        console.log(error)
    }
}