import { ArrowLeft, Check, Rocket, RocketIcon, Share2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {motion} from "motion/react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverurl } from '../App'


function Dashboard() {
    const {userData}=useSelector(state=>state.user)

    const navigate=useNavigate()
    const [websites,setWebsites]=useState(null)
    const [error,setError]=useState("")
    const [loading,setLoading]=useState(false)
    const [copiedId,setCopiedId]=useState(null)

   



const handleDeploy=async (id)=>{
  try {
    const result = await axios.get(`${serverurl}/api/website/deploy/${id}`,{withCredentials:true})
   window.open(`${result.data.url}`, "_blank")
   setWebsites((prev)=>
  prev.map((w)=>
 w._id===id?
   {...w,deployed:true,deployedUrl:result.data.url}
   : w
  )
  )

  } catch (error) {
    console.log(error);
    
  }
}

    useEffect(()=>{
      const handleGetAllWebsites=async ()=>{
    setLoading(true)
        try {
          const result=await axios.get(`${serverurl}/api/website/get-all`,{withCredentials:true})
          setWebsites(result.data || [])
          setLoading(false)
        } catch (error) {
          console.log(error);
          setError(error.response.data.message)
          setLoading(false)
        }
      }
      handleGetAllWebsites()
    },[])

const handleCopy= async (site)=>{
await navigator.clipboard.writeText(site.deployedUrl)
setCopiedId(site._id)
setTimeout(() => {
  setCopiedId(null)
}, 5000);
}

  return (
    <div className='min-h-screen bg-[#050505] text-white'>


      <div className='sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button onClick={()=>navigate("/")} className='p-2 rounded-lg hover:bg-white/10 transition'>
              <ArrowLeft size={16} />
            </button>
            <h1 className='text-lg font-semibold'>Dashboard</h1>
          </div>

          <button onClick={()=>navigate("/generate")} className='px-4 py-2 rounded-lg bg-linear-to-r from-orange-300 to-yellow-300 text-black font-semibold text-sm font-semibold hover:scale-105 transition'>
            + New Project

          </button>
        </div>
      </div>
      <div className='max-w-7xl mx-auto px-6 py-10'>
       <motion.div
       initial={{opacity:0,y:12}}
       animate={{opacity:1,y:0}}
       className='mb-10'
       >
<p className='text-sm text-zinc-400 mb-1'>Welcome Back</p>
<h1 className='text-3xl font-bold'>{userData.name}</h1>
       </motion.div>
{ loading && (
  <div className='mt-24 text-center text-zinc-400 '>Loading Your Websites...</div>
)}

{error && !loading (
  <div  className='mt-24 text-center text-red-400 '> {error}</div>
)}

{websites?.length == 0 && (
  <div className='mt-24 text-center font-bold text-zinc-50 '>Click on Create for your First Project</div>
)}

{!loading && !error && websites?.length>0 &&  (
<div className='grid grid-cols-1 sm: grid-cols-2 xl:grid-cols-3 gap-8'>



  {websites.map((w,i)=>{
const copies=copiedId===w._id

    return <motion.div 
    onClick={()=>navigate(`/editor/${w._id}`)}
   key={i}
   initial={{opacity:0,y:20}}
   animate={{opacity:1, y:0}}
   transition={{delay:i*0.05}}
   whileHover={{y:-6}}
   className=' rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition flex flex-col'>


<div className='relative h-40 bg-black cursor-pointer'> 
  <iframe srcDoc={w.latestCode} className='absolute inset-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white'/>
  
   </div>
   <div className='p-5 flex flex-col gap-4 flex-1'>
<h3 className='text-base font-semibold line-clamp-2'>{w.title}</h3>
<p className='text-sm text-zinc-400'>{`Last Updated  ${new Date(w.updatedAt).toLocaleDateString()}`}</p>

{!w.deployed ? (
   <button onClick={()=>handleDeploy(w._id)} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-orange-300 to-yellow-300 text-black font-semibold hover:scale-105 transition text-sm sm:text-base">
        <RocketIcon size={16} />
        <span>Deploy</span>
      </button>) :(<motion.button 
      whileTap={{scale:0.95}}
      onClick={  (e)=>{ e.stopPropagation();  handleCopy(w)}}
      className={`mt-auto flex itec justify-center
      gap-2 px-4 py-2 rounded-4xl text-sm font-medium transition-all ${copies ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
        "bg-white/10 hover:bg-white/20 border border-white/10"
       
      }`}
      >
{copies ?(<>
<Check size={14}/>
Link Copied
</>):
<>
<Share2/> Share Link
</>
}

      </motion.button>)
}
   </div>
   </motion.div> 
})}

</div>
)}

      </div>
    </div>
  )
}

export default Dashboard