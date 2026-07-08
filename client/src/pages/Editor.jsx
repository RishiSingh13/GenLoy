import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { serverurl } from '../App'
import { ArrowLeft, Code2, MessageCircle, MessageSquare, Monitor, Rocket, Send, X } from 'lucide-react'
import { useRef } from 'react'
import { AnimatePresence , motion } from 'motion/react'
import Editor from '@monaco-editor/react';

function WebsiteEditor() {
    const { id } = useParams()
     const navigate=useNavigate()
    const [website, setWebsite] = useState("")
    const [error, setError] = useState("")
    const [code,setCode]=useState("")
    const [messages,setMessages]=useState([])
    const [prompt,setPrompt]=useState("")
    const iframeRef=useRef(null)
    const [thinkingindex,setThnkingindex]=useState(0)
    const [updateLoading,setUpdateLoading]=useState(false)
    const [showcode,setShowcode]=useState(false)
    const [showFullcode,setShowFullcode]=useState(false)
    const [showchat,setShowchat]=useState(false)
    const thinkingSteps=[
        "Understanding your request...",
        "Planning layout changes... ",
        "Improving responsiveness",
        "Applying animations...",
        "Finalizing updates..."

    ]
    const handleUpdate=async ()=>{
 if(!prompt)return
        setUpdateLoading(true)
        const text=prompt
        setPrompt("")
        setMessages((m)=>[...m,{role:"user",content:prompt}])
       try {
        const result=await axios.post(`${serverurl}/api/website/update/${id}`,{prompt:text},{withCredentials:true})
        console.log(result)
        setUpdateLoading(false)
        setMessages((m)=>[...m,{role:"ai", content:result.data.message}])
        setCode(result.data.code)
       } catch (error) {
        setUpdateLoading(false)
       } 
    }
    const handleDeploy=async ()=>{
  try {
    const result = await axios.get(`${serverurl}/api/website/deploy/${website._id}`,{withCredentials:true})
   window.open(`${result.data.url}`, "_blank")
  

  } catch (error) {
    console.log(error);
    
  }
}
    useEffect(()=>{
        if(!updateLoading) return
const i= setInterval(() => {
    setThnkingindex((i)=>(i+1)%thinkingSteps.length)

 }, 3000);

 

 return ()=>clearInterval(i)
    },[updateLoading])
    useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                const result = await axios.get(`${serverurl}/api/website/get-by-id/${id}`, { withCredentials: true })
                setWebsite(result.data)
                setCode(result.data.latestCode)
                setMessages(result.data.conversation)

            } catch (error) {
                console.log(error);
                setError(error.response.data.message)

            }
        }

        handleGetWebsite()

    }, [id])

    useEffect(()=>{
if(!iframeRef.current || !code)return;

const blob=new Blob([code],{type:"text/html"})

const url=URL.createObjectURL(blob)
iframeRef.current.src=url
return ()=> URL.revokeObjectURL(url)
    },[code])

    if (error) {
        return (
            <div className='h-screen flex items-center justify-center bg-black text-red-400'>
                {error}
            </div>
        )
    }

    if (!website) {
        return (
            <div className='h-screen flex items-center justify-center bg-black text-white'>
                Loading . . .
            </div>
        )
    }
   

    return (
        <div className='h-screen w-screen flex  bg-black text-white overflow-hidden'>
          

            <aside className='hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80'>
                <Header />
                            <>
                        <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`max-w-[85%] ${m.role === "user" ? "ml-auto" : "mr-auto"}`}
                    >
                        <div

                            className={` px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-white text-black"
                                    : "bg-black/5 border border-white/10 text-zinc-200"
                            } `}
 >
    
{m.content}

 </div>

    </div>
))}

{updateLoading && <div className='max-w-[85%] mr-auto'>
    <div className='px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white.10 text-zinc-400 italic'>

       {thinkingSteps[thinkingindex]} 
    </div>
    
    </div>}

     </div>

     <div className='p-3 border-t border-white/10'>
<div className='flex gap-2'>
<input className='flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none' onChange={(e)=>setPrompt(e.target.value)} value={prompt} placeholder='Describe Changes' />
<button onClick={handleUpdate} className='px-4 py-3 rounded-2xl bg-white text-black ' disabled={updateLoading} ><Send size={14}/></button>
</div>
</div>
            </>
            </aside>

           <div className="flex flex-1 flex-col">
  <div className="border-b border-white/10 bg-black/80 px-3 sm:px-4 py-3 sm:py-0 sm:h-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">

    
    <span className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">
        <button onClick={()=>navigate("/dashboard")} className='relative z-10 text-white  flex items-center gap-2 text-sm  hover:text-yellow-400 transition'><ArrowLeft size={16}/>Back</button>
      Live Preview

    </span>

    
    <div className="flex items-center justify-end flex-wrap gap-2">
{
    website.deployed ?"":
     <button onClick={handleDeploy} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-orange-300 to-yellow-300 text-black font-semibold hover:scale-105 transition text-sm sm:text-base">
        <Rocket size={16} />
        <span>Deploy</span>
      </button>
}

     

    <button className='p-2 lg:hidden' onClick={()=>setShowchat(true)}><MessageSquare size={18}/></button>  

      <button onClick={()=>setShowcode(true)} className="p-2 rounded-lg hover:bg-white/10 transition">
        <Code2 size={18} />
      </button>



      <button onClick={()=>setShowFullcode(true)} className="p-2 rounded-lg hover:bg-white/10 transition">
        <Monitor size={18} />
      </button>

    </div>

  </div>

  <iframe ref={iframeRef} className='flex-1 w-full bg-white' sandbox='allow-scripts allow-same-origin allow-forms'/>
</div>

<AnimatePresence>
    {showchat && (
        <motion.div
        initial={{y:"100%"}}
        animate={{y:0}}
        exit={{y:"100%"}}
        className='fixed inset-0 z-[9999] bg-black flex flex-col'
        >
  <Header/>
 <>
                        <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`max-w-[85%] ${m.role === "user" ? "ml-auto" : "mr-auto"}`}
                    >
                        <div

                            className={` px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-white text-black"
                                    : "bg-black/5 border border-white/10 text-zinc-200"
                            } `}
 >
    
{m.content}

 </div>

    </div>
))}

{updateLoading && <div className='max-w-[85%] mr-auto'>
    <div className='px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white.10 text-zinc-400 italic'>

       {thinkingSteps[thinkingindex]} 
    </div>
    
    </div>}

     </div>

     <div className='p-3 border-t border-white/10'>
<div className='flex gap-2'>
<input className='flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none' onChange={(e)=>setPrompt(e.target.value)} value={prompt} placeholder='Describe Changes' />
<button onClick={handleUpdate} className='px-4 py-3 rounded-2xl bg-white text-black ' disabled={updateLoading} ><Send size={14}/></button>
</div>
</div>
            </>
        </motion.div>
    )}
</AnimatePresence>

<AnimatePresence>
    {showcode && (
        <motion.div
        initial={{x:"100%"}}
        animate={{x:0}}
        exit={{x:"100%"}}
        className='fixed inset-y-0 right-0 w-full lg:w-[45%] z-[9999] bg-black/86 flex flex-col '
        >
            <div className='h-12 px-4 flex justify-between items-center border-b border-white/10 bg-black/87'>
                <span>Source code</span>
                <button onClick={()=>setShowcode(false)}><X size={18}/></button>
            </div>
  <Editor
  theme='vs-dark'
  value={code}
  language='html'
  onChange={(v)=>setCode(v)}
  />
        </motion.div>
    )}
</AnimatePresence>

<AnimatePresence>
    {showFullcode && (
        <motion.div
        className='fixed inset-0 z-[9999] bg-black'
        >
            
<iframe sandbox='allow-scripts allow-same-origin allow-forms' className='w-full h-full bg-white' srcDoc={code}/>
 <button className='absolute border border-white/40   top-4 right-4 p-2 bg-black/70 rounded-lg hover:border-white ' onClick={()=>setShowFullcode(false)}><X size={18}/></button>
        </motion.div>
    )}
</AnimatePresence>

        </div>
    )

    function Header() {
        return (
            <div className='h-14 px-4 flex items-center justify-between border-b border-white/10'>
                <span className='font-semibold truncate'>
                    {website.title}
                </span>
<button className='lg:hidden ' onClick={()=>setShowchat(false)}><X/></button>
            </div>
        )


    }




}



export default WebsiteEditor
