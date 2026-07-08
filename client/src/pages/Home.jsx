import React, { useState } from 'react'
import {AnimatePresence, motion, scale} from "motion/react"
import LoginModal from '../components/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import {Coins, LogOut} from "lucide-react"
import axios from 'axios';
import { serverurl } from '../App';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

import Spline from '@splinetool/react-spline';

// export default function Home() {
//   return (
//     <main>
//       <Spline
//         scene="https://prod.spline.design/9lGeSHA9Vmh0QlRU/scene.splinecode" 
//       />
//     </main>
//   );
// }



function Home() {
  const dispatch=useDispatch()
  const handlelogout=async()=>{

    try {
      await axios.get(`${serverurl}/api/auth/logout`,{withCredentials:true})
      dispatch(setUserData(null))

    } catch (error) {
      console.log(error);
      
    }
  }
  const highlights = [
  {
    title: "AI-Powered Website Generation",
    description:
      "Describe your idea in plain English, and our AI transforms it into clean, modern, and production-ready website code. Skip repetitive coding and focus on building your vision faster.",
  },
  {
    title: "Instant Live Preview",
    description:
      "Watch your website come to life in real time as the AI generates code. Instantly preview every section, test responsiveness, and make changes without leaving the browser.",
  },
  {
    title: "One-Click Deployment",
    description:
      "When your project is ready, publish it to the web with a single click. No complicated setup or manual configuration—just deploy, share your link, and go live in seconds.",
  },
];
const [openLogin,setOpenLogin]=useState(false)
 const {userData}=useSelector(state=>state.user)
 const [openprofile,setOpenprofile]=useState(false)
 const navigate=useNavigate()

  return (
    <div className='relative min-h-screen bg-black text-white overflow-hidden'>
      <div className="absolute inset-0 pointer-events-none ">
  <Spline scene="https://prod.spline.design/9lGeSHA9Vmh0QlRU/scene.splinecode" />
</div>


      <motion.div 
      initial={{y:-40,opacity:0}}
      animate={{y:0,opacity:1}}
      transition={{duration:0.5}}

      
      className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10' >

 
 <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
  <div className='text-lg font-semibold'>
GenLoy.ai
  </div> 
  <div className='flex items-center gap-5'>
  <div onClick={()=>navigate("/pricing")} className='hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer'>
 Pricing

  </div>

  {userData  && <div onClick={()=>navigate("/pricing")}  className='flex items-center gap-2 py-1.5 px-3 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:text-white transition'>
    <Coins size={14} className='text-yellow-400'/>
    <span className='text-zinc-300'>Credits</span>
    <span>{userData.credits}</span>
    <span className='font-semibold'>+</span>
    </div>}
  {!userData ? 
<button className='px-4 py-2 rounded-lg border-white/20 hover:bg-white/10 text-sm' onClick={()=>setOpenLogin(true)}>
  Get Started
  </button>:
  <div className='relative' >
  <button onClick={()=>setOpenprofile(!openprofile )}  className='flex items-center'><img className={`w-9 h-9 rounded-full border ${openprofile ?  "border-white border-2": "border-white/20"}  object-cover`} src={ `https://ui-avatars.com/api/?name=${userData.name}&background=random` }/></button>  
 
 <AnimatePresence>
{openprofile && (
  <>
  <motion.div
  initialv={{opacity:0,y:-10,scale:0.95}}
  animate={{opacity:1,y:0,scale:1}}
  exit={{opacity:0,y:-10,scale:0.95}}
  className='absolute right-0 mt-3 w-60 z-50 rounded-xl bg-black border border-orange-300/29 shadow-2xl overflow-hidden '
  >
   <div className='px-4 py-3 border-b border-white/10'>
    <p className='text-sm font-medium truncate'>{userData.name}</p>
    <p className='text-xs text-zinc-500 truncate'>{userData.email}</p>
    </div>
    <button onClick={()=>navigate("/dashboard")}
    className='w-full px-4 text-left text-sm hover:bg-white/5 '>Dashboard</button>
    
    <button onClick={handlelogout} className='w-full  flex gap-3 px-4 text-left text-sm text-red-400 hover:bg-red-400/67 hover:text-black font-semibold'>Logout<LogOut size={18} /></button>

  </motion.div>
  </>
)
   
}

 </AnimatePresence>
  </div>
}

  
  </div>

 </div>

      </motion.div>

<section className="relative z-10 pt-44 pb-32 px-6 text-center">
<motion.h1
initial={{opacity:0, y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.5}}

className='text-5xl md:text-7xl font-bold tracking-tight'
>
  Build Stunning WebSite <br/>
  <span className='bg-linear-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent '>with GenLoy</span>
</motion.h1>
<motion.p
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:0.5}}
className='mt-8 max-w-2xl mx-auto text-zinc-400 text-lg'

>
  Describe your idea and let AI genrate a modern,
   resposive, production-ready website.
</motion.p>

  <button className='mt-12 px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition' onClick={userData ?  ()=>navigate("/dashboard"): ()=>setOpenLogin(true)}>{userData?"Go to Dashboard" : "Get Started" }</button>


</section>

<section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
<div className=' pb-10 grid grid-cols-1 md:grid-cols-3 gap-10'>
{highlights.map((h,i)=>{
  return(
  <motion.div
  key={i}
  initial={{opacity:0,y:40}}
  whileInView={{opacity:1,y:0}}
  className='rounded-2xl  bg-white/5 border border-white/10 p-8'
  >
    <h1 className='text-xl font-semibold mb-3'>{h.title}</h1>
    <p className='text-sm text-zinc-400'>
      {h.description}
    </p>
    
  </motion.div>
)})}

</div>

</section>

<footer className="relative z-10 border-t border-white/10 bg-black/70 backdrop-blur-sm py-10">
  <div className="max-w-7xl mx-auto px-6 text-center">

    <h3 className="text-2xl font-semibold text-white">
      GenLoy.AI
    </h3>

    <p className="mt-3 text-zinc-400 max-w-xl mx-auto">
      Generate beautiful, responsive, production-ready websites from a single prompt.
      Preview instantly and deploy with one click.
    </p>

    <div className="mt-8 space-y-2 text-sm text-zinc-500">
      <p>
        Designed & Developed with ❤️ by <span className="text-white font-medium">Rishi Singh</span>
      </p>

      <p>
        Built with React, Tailwind CSS, Node.js, Express, MongoDB Atlas,Framer Motion, Firebase Auth, AI Integration, Stripe Payments and deployed using modern cloud infrastructure.
      </p>

      <p>
        © {new Date().getFullYear()} GenLoy AI. All rights reserved.
      </p>
    </div>

  </div>
</footer>
{openLogin && <LoginModal open={openLogin} onClose={()=>setOpenLogin(false)}/>}
    </div>
  )
}

export default Home
