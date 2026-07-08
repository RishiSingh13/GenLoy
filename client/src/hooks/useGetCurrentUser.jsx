import axios from 'axios'
import React, { use, useEffect } from 'react'
import { serverurl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useDispatch } from "react-redux"
function useGetCurrentUser() {
 const dispatch = useDispatch()
  useEffect(()=>{
 const getCurrentUser=async ()=>{
try {
    const result =await axios.get(`${serverurl}/api/user/me`,{withCredentials:true})
    dispatch(setUserData(result.data))
    
} catch (error) {
    console.log(error);
    
}
 }
 getCurrentUser()
  },[])
}

export default useGetCurrentUser
