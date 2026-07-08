import  JsonWebTokenError from "jsonwebtoken"
import User from "../models/user_model.js"

export const gAuth=async (req,res)=>{
    try{
        const {name,email,avatar}=req.body
        if(!email){
            return res.status(400).json({
                message:"email is required"
            })
        }
       const user=await User.findOne({email})
       if(!user){
        user=await User.create({name,email,avatar})

       }
      const token= await JsonWebTokenError.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"})
      res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge:7*24*60*60*1000
      })

      return res.status(200).json(user)

    }catch(error){
return res.status(500).json({message:`Google auth error ${error}`})
    }
}

export const logout=async(req,res)=>{

    try{
        
        res.clearCookie("token",{
            httpOnly:true,
            secure:true,
            samesite:"none"
            
        })

  return res.status(200).json({message:"logout successfully"})
    }catch(error){
        return res.status(500).json({message:`logout error ${error}`})
    }
}

