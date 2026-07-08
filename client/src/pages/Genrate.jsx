import { ArrowLeft } from 'lucide-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useState } from 'react'
import  axios from "axios"
import { serverurl } from '../App'
import { ReducerType } from '@reduxjs/toolkit'

const PHASES=[
  "Analyzing your ideas...",
  "Designing layout & structure...",
  "Writing Source code...",
  "Adding animationns & interactions...",
  "Final quality checks..."
];
function Genrate() {

  const [prompt ,setPrompt]=useState("")
  const [progress,setProgress]=useState(0)
  const [index,setIndex]=useState(0)
      const navigate=useNavigate()
      const [loading,setLoading]=useState(false)
      const handleGenerateWebsite=async ()=>{
        setLoading(true)
        try {
          const result= await axios.post(`${serverurl}/api/website/generate`,{prompt},{withCredentials:true})
          console.log(result)
          setLoading(false)
          setProgress(100)
          navigate(`/editor/${result.data.websiteId}`)
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
      }
 useEffect(()=>{
if(!loading){
  setIndex(0)
  setProgress(0)
  return
}

let value=0
let phase=0
const interval=setInterval(()=>{
const increment= value< 20 ? Math.random()*1.5 : value <60 ? Math.random()*1.2
:Math>random()*1.6

value+=increment

if(value>=93)value=93;
phase=Math.min(
  Math.floor((value/100)* PHASES.length),PHASES.length-1
)
setProgress(Math.floor(value))
setIndex(phase)
return()=>clearInterval(interval)
},3000)

 },[loading])
  return (

    <div className='min-h-screen bg-linear-to-br from-zinc-800 via-black to-zinc-900 text-white' >
      
      <div className='sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button onClick={()=>navigate("/")} className='p-2 rounded-lg hover:bg-white/10 transition'>
              <ArrowLeft size={16} />
            </button>
            <h1 className='text-lg font-semibold'><span className='bg-linear-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent font-bold'>GenLoy</span>.AI</h1>
          </div>

          
        </div>
      </div>
<div className='max-w-6xl mx-auto px-6 py-16'>
<motion.div
 initial={{opacity:0,y:30}}
 animate={{opacity:1,y:0}}
 transition={{duration:0.2}}
 className='text-center mb-16'
>
<h1 className='text-4xl md:text-5xl font-bold mb-5 leading-tight '>Build Website with

  <span className='block bg-linear-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent '> Just a Prompt </span>
</h1>
<p className='text-zinc-400 max-w-2xl mx-auto'>
  This process may take several minutes,
  genweb.AI focuses on quality, not shortcuts
</p>

</motion.div>

<div className='mb-14'>
  <h1 className='text-xl font-semibold mb-2'>Describe your Idea</h1>
  <div className='relative'>
<textarea className='w-full h-56 p-6 rounded-3xl bg-black/60 border border-white/10 outline-none resize-none text-sm leading-relaxed focus:ring-2 focus:ring-white'
 onChange={(e)=>setPrompt(e.target.value)}
 value={prompt}
 placeholder='Promt your Idea in Detail. . .'></textarea>
  </div>

</div>

<div className='flex justify-center'>
<motion.button
onClick={handleGenerateWebsite}
disabled={ !prompt.trim() && !loading}
className={`px-14 py-4 rounded-full font-semibold text-lg ${
  prompt.trim() && !loading
 ? "bg-white text-black"
:"bg-white/20 text-zinc-400 cursor-not-allowed" } `}
whileHover={{scale:1.05}}
whileTap={{scale:0.96}}
>
Genrate
</motion.button>

</div>
{loading && (
  <motion.div
  initial={{opacity:0}}
  animate={{opacity:1}}
  className='max-w-xll mx-auto mt-12'
  >
<div className='flex justify-between mb-2 text-xs text-zinc-400'>
  <span>{PHASES[index]}</span>
  <span>{progress}%</span>
</div>

<div className='h-2 w-full bg-white/10 rounded-full  overflow-hidden'>
<motion.div
className='h-full bg-linear-to-r from-orange-300 to-yellow-300'
animate={{width:`${progress}%`}}
transition={{ease:"easeOut",duration: 0.8}}
/>


</div>

  </motion.div>
)}

</div>

    </div>
  )
}

export default Genrate
