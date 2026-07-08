import { ArrowLeft, Check, Coins } from 'lucide-react'
import React, { useState } from 'react'
import {  motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { serverurl } from '../App'

const plans=[
    {
        key:"free",
        name:"Free",
        price:"₹0",
        description:"Perfect to explore ",
        feature:[
            "AI website generaation",
            "Responsive Output",
            "Basic animations",
        ],
        popular:false,
        button: "Get Started",

    },
{
    
        key:"pro",
        name:"Pro",
        credits:"500",
       price:"₹499",
 description:"For serious creators and freelancers",
     feature:[
        "Everthing is Free",
        "Faster generation",
        "Edit and regenrate",
     ],
     popular:true,
     button: "Upgrade to Pro"
},
{
    
        key:"enterprise",
        name:"Enterprise",
       price:"₹1499",
       credits:1000,
 description:"For teams and power users",
     feature:[
        "Unlimited iterations",
        "Highest priority",
        "Teams collaboratio",
        "Dedicated support",
     ],
     popular:false,
     button: "Contact Sales"
},
]
function Pricing() {
    const navigate=useNavigate()
    const [loading,setLoading]=useState(null)
    const {userData}=useSelector(state=>state.user)
    const handleBuy= async (planKey)=>{
if(!userData){
    navigate("/")
    return
}
if(planKey=="free"){
    navigate("/dashboard")
    return
}
setLoading(planKey)
try {
    const result=await axios.post(`${serverurl}/api/billing`,{planType:planKey},{withCredentials:true})
    window.location.href=result.data.sessionUrl
    setLoading(false)
} catch (error) {
    console.log(error);
    setLoading(false)
}

    }
  return (
    <div className='relative min-h-screen overflow-hidden bg-black/85 text-white px-6 pt-16 pb-24'>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]'/>
<div className='absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]'/>
        </div>
<button onClick={()=>navigate("/")} className='relative z-10 mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition'><ArrowLeft size={16}/>Back</button>


<div className='relative z-10 max-w-4xl mx-auto text-center mb-14'>
    <h1 className='text-4xl md:text-5xl font-bold mb-4'>Simple, tranparent pricing </h1>
<p className='text-zinc-400 text-lg'>Buy credits once, Build anytime.</p>
</div>

<div className='relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>

    {plans.map((p,i)=>{
        return (
        <div key={i} className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-all ${p.popular ?
 "border-amber-500 bg-gradient-to-b from-orange-300 to-transparent shadow-2xl shadow-yellow-300/40"
 :
 "border-white/10 bg-white/5 hover:border-amber-400 hover:bg-white/10"
        }`}>
{p.popular && (
<span className='absolute top-5 right-5 px-3 py-1 text-xs rounded-full text-black bg-green-300'>Most Popular</span>
)}

<h1 className='text-xl font-semibold mb-2'>{p.name}</h1>
<p className='text-zinc-400 text-sm mb-6'>{p.description}</p>

<div className='flex items-end gap-1 mb-4'>
    <span className= {`text-4xl ${p.popular ? "text-black": "text-white"} font-bold`}>{p.price}</span>
    <span className='text-sm text-zinc-400 mb-1'>/one-time</span>
    </div>

<div className='flex items-center gap-2 mb-8'>  
    <Coins size={18} className='text-yellow-400'/>
    <span className='font-semibold'>{p.credits}Credits</span>
</div>
<ul className='space-y-3 mb-10'>
    {p.feature.map((f)=>(
        <li key={f}
        className='flex items-center gap-2 text-sm text-zinc-300'
        >
            <Check size={16} className='text-green-300'/>
            {f}
        </li>
    ))}
</ul>

<motion.button
whileTap={{scale:0.96}}
onClick={()=>handleBuy(p.key)}
disabled={loading}
className={`w-full py-3 rounded-xl font-semibold transition ${p.popular ? "bg-indigo-500 hover:bg-indigo-600" :
"bg-white/10 hover:bg-white/20"
} disabled:opacity-60`}
>
    {loading===p.key ? "Redirecting ...":
    p.button
    }

</motion.button>

            </div>
    )})}

</div>
      </div>

  )
}

export default Pricing
