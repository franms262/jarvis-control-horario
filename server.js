import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
app.use(express.json({limit:"1mb"}));
app.use(express.static(path.join(__dirname,"public")));
app.get("/api/status",(_req,res)=>res.json({ready:Boolean(API_KEY),model:MODEL}));
app.post("/api/chat",async(req,res)=>{
  try{
    if(!API_KEY)return res.status(503).json({error:"La IA conversacional no está configurada. Los cálculos locales y el registro siguen disponibles."});
    const messages=Array.isArray(req.body?.messages)?req.body.messages:[];
    const safe=messages.filter(m=>m&&["user","assistant"].includes(m.role)&&typeof m.content==="string").slice(-16).map(m=>({role:m.role,content:m.content.slice(0,9000)}));
    if(!safe.length)return res.status(400).json({error:"No hay ningún mensaje."});
    const response=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Authorization":`Bearer ${API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:MODEL,temperature:0.3,messages:[{role:"system",content:"Eres JARVIS, asistente personal profesional y futurista. Ayudas al usuario a interpretar su registro laboral de WhatsApp. Si el mensaje incluye un resumen de eventos o cálculos, basa tus respuestas en esos datos; no inventes horas ni hechos. Si faltan registros, dilo claramente. Responde en español, de forma clara. Los cálculos oficiales del registro los realiza la aplicación; no cambies sus datos por tu cuenta."},...safe]})});
    const data=await response.json();
    if(!response.ok)return res.status(response.status).json({error:data?.error?.message||"Error del proveedor de IA."});
    res.json({reply:data?.choices?.[0]?.message?.content||"No he recibido respuesta."});
  }catch(e){console.error(e);res.status(500).json({error:"No se pudo conectar con la IA."});}
});
app.listen(PORT,()=>console.log(`Jarvis listo en http://localhost:${PORT}`));