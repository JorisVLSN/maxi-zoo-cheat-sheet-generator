import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const Promo = z.object({
  brand:z.string().default(""), product:z.string(), category:z.enum(["Kat","Hond","Accessoires","Konijnen & knaagdieren","Vogels & kippen","Maxi Deals","Maxi Zoo Friends","Outlet","Overig"]),
  offer:z.string(), price:z.string().optional(), validFrom:z.string().optional(), validUntil:z.string().optional(), friendsOnly:z.boolean().optional(), maxiDeal:z.boolean().optional(), outlet:z.boolean().optional(), notes:z.string().optional(), sourcePage:z.number().optional()
});
const Result = z.object({title:z.string().default("Cheat Sheet"),period:z.string().default(""),promos:z.array(Promo),warnings:z.array(z.string()).default([])});

function fallback(text:string){
  const lines=text.split(/\n+/).map(x=>x.trim()).filter(Boolean);
  const offers=lines.filter(l=>/(gratis|korting|2de aan|2e aan|\+\s*\d+\s*L|tot\s*50%)/i.test(l));
  return {title:"Cheat Sheet",period:"",warnings:["AI-sleutel ontbreekt of parsing faalde. Controleer de herkende regels manueel."],promos:offers.map((offer,i)=>({id:String(i+1),brand:"",product:lines[Math.max(0,lines.indexOf(offer)-1)]||"Onbekend product",category:"Overig",offer}))};
}

export async function POST(req:Request){
  const {text}=await req.json();
  if(!text || typeof text!=="string") return NextResponse.json({error:"Geen tekst ontvangen"},{status:400});
  const key=process.env.GEMINI_API_KEY;
  if(!key) return NextResponse.json(fallback(text));
  try{
    const model=new GoogleGenerativeAI(key).getGenerativeModel({model:"gemini-2.0-flash"});
    const prompt=`Je bent een uiterst nauwkeurige parser voor Belgische Maxi Zoo folders. Zet onderstaande PDF-tekst om naar JSON. Neem ALLE promoties op, ook Friends, Maxi Deals, lage prijzen en outlet. Categorieën exact: Kat, Hond, Accessoires, Konijnen & knaagdieren, Vogels & kippen, Maxi Deals, Maxi Zoo Friends, Outlet, Overig. Geef alleen geldige JSON met velden title, period, warnings, promos. Elke promo: brand, product, category, offer, price optioneel, validFrom, validUntil, friendsOnly, maxiDeal, outlet, notes, sourcePage. Maak geen aanbiedingen bij gewone prijzen zonder promo, behalve expliciete Lage Prijs-blokken. Tekst:\n${text.slice(0,120000)}`;
    const r=await model.generateContent(prompt);
    const raw=r.response.text().replace(/^```json\s*/,'').replace(/```$/,'').trim();
    const parsed=Result.parse(JSON.parse(raw));
    return NextResponse.json({...parsed,promos:parsed.promos.map((p,i)=>({...p,id:crypto.randomUUID?.()||String(i)}))});
  }catch(e){ return NextResponse.json(fallback(text)); }
}
