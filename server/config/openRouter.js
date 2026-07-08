const openRouterRrl="https://openrouter.ai/api/v1/chat/completions"

const model="deepseek/deepseek-chat"

export const genrateResponse=async (prompt)=>{
    const res=await fetch(openRouterRrl, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: model,
    messages: [
        {
     role:"system",content:"You must return Only valid raw JSON"
        },
      {
        role: 'user',
        content:prompt,
      },
    ],
    temperature:0.2
  }),
});
if(!res.ok){
    const err=await res.text()
    throw new Error("openRouter err"+ err)

}
const data=await res.json()
return data.choices[0].message.content
}