"use client";
import { useMemo, useRef, useState } from "react";
import { Upload, Sparkles, Download, FileSpreadsheet, Presentation, Trash2, Plus, AlertTriangle } from "lucide-react";
import { categories, Category, ParseResult, Promo } from "@/lib/types";
import { sample } from "@/lib/sample";

const colors:Record<Category,string>={"Kat":"#8f3ba6","Hond":"#da5a11","Accessoires":"#148b8b","Konijnen & knaagdieren":"#4f8f22","Vogels & kippen":"#d8a500","Maxi Deals":"#00613a","Maxi Zoo Friends":"#4f8126","Outlet":"#f0b52f","Overig":"#607d8b"};

export default function App(){
 const [data,setData]=useState<ParseResult>(sample); const [busy,setBusy]=useState(false); const [exporting,setExporting]=useState<string | null>(null); const [fileName,setFileName]=useState(""); const [advancedOpen,setAdvancedOpen]=useState(false); const [compact,setCompact]=useState(true); const [showNotes,setShowNotes]=useState(true); const [highlightDeals,setHighlightDeals]=useState(true); const sheetRef=useRef<HTMLDivElement>(null);
 const grouped=useMemo(()=>categories.map(c=>[c,data.promos.filter(p=>p.category===c)] as const).filter(([,p])=>p.length),[data.promos]);
 async function readPdf(file:File){
   setBusy(true); setFileName(file.name);
   try{
    const pdfjs=await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc=`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
    const pdf=await pdfjs.getDocument({data:await file.arrayBuffer()}).promise; let text="";
    for(let i=1;i<=pdf.numPages;i++){const page=await pdf.getPage(i); const content=await page.getTextContent(); text+=`\n--- PAGE ${i} ---\n`+content.items.map((x:any)=>x.str).join(" ");}
    const r=await fetch("/api/parse",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text})});
    if(!r.ok) throw new Error("Parsing mislukt"); setData(await r.json());
   }catch(e){alert("PDF kon niet automatisch worden verwerkt. De voorbeelddata blijft zichtbaar.");} finally{setBusy(false);}
 }
 function patch(id:string,key:keyof Promo,value:any){setData(d=>({...d,promos:d.promos.map(p=>p.id===id?{...p,[key]:value}:p)}));}
 function remove(id:string){setData(d=>({...d,promos:d.promos.filter(p=>p.id!==id)}));}
 function add(){setData(d=>({...d,promos:[...d.promos,{id:crypto.randomUUID(),brand:"",product:"Nieuw product",category:"Overig",offer:"Nieuwe promotie"}]}));}
 async function png(){const html2canvas=(await import("html2canvas")).default; const canvas=await html2canvas(sheetRef.current!,{scale:2,backgroundColor:"#fff"}); const a=document.createElement("a");a.href=canvas.toDataURL("image/png");a.download="maxi-zoo-cheat-sheet.png";a.click();}
 async function pdf(){const html2canvas=(await import("html2canvas")).default; const {jsPDF}=await import("jspdf"); const canvas=await html2canvas(sheetRef.current!,{scale:2,backgroundColor:"#fff"}); const doc=new jsPDF("p","mm","a4"); doc.addImage(canvas.toDataURL("image/png"),"PNG",0,0,210,297);doc.save("maxi-zoo-cheat-sheet.pdf");}
 async function excel(){const XLSX=await import("xlsx");const ws=XLSX.utils.json_to_sheet(data.promos);const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,"Promoties");XLSX.writeFile(wb,"maxi-zoo-promoties.xlsx");}
 async function pptx(){
  if(!sheetRef.current) return;
  setExporting("PowerPoint");
  try{
   const html2canvas=(await import("html2canvas")).default;
   const mod=await import("pptxgenjs");
   const PptxGenJS=(mod as any).default || mod;
   const canvas=await html2canvas(sheetRef.current,{scale:2,backgroundColor:"#fff",useCORS:true});
   const image=canvas.toDataURL("image/png");
   const ppt=new PptxGenJS();
   ppt.defineLayout({name:"A4_PORTRAIT",width:8.2677,height:11.6929});
   ppt.layout="A4_PORTRAIT";
   ppt.author="Maxi Zoo Cheat Sheet Generator";
   ppt.subject="Maxi Zoo promotieoverzicht";
   ppt.title=`Maxi Zoo Cheat Sheet ${data.period}`;
   ppt.company="Maxi Zoo";
   ppt.lang="nl-BE";
   const slide=ppt.addSlide();
   slide.background={color:"FFFFFF"};
   slide.addImage({data:image,x:0,y:0,w:8.2677,h:11.6929});
   await ppt.writeFile({fileName:"maxi-zoo-cheat-sheet.pptx"});
  }catch(error){
   console.error(error);
   alert("De PowerPoint-export is mislukt. Vernieuw de pagina en probeer opnieuw.");
  }finally{setExporting(null);}
 }
 return <main>
  <header><div><div className="eyebrow">MAXI ZOO</div><h1>Cheat Sheet Generator</h1><p>Upload een folder, controleer de herkende promoties en exporteer onmiddellijk.</p></div><button className="status" onClick={()=>setAdvancedOpen(v=>!v)} aria-expanded={advancedOpen}><Sparkles size={18}/> Geavanceerde Maxi Zoo-modus <span>{advancedOpen?"−":"+"}</span></button></header>
  {advancedOpen&&<section className="advanced"><div><b>Geavanceerde instellingen</b><span>Deze opties wijzigen de preview én alle exports.</span></div><label><input type="checkbox" checked={compact} onChange={e=>setCompact(e.target.checked)}/> Compacte winkelweergave</label><label><input type="checkbox" checked={showNotes} onChange={e=>setShowNotes(e.target.checked)}/> Uitzonderingen en notities tonen</label><label><input type="checkbox" checked={highlightDeals} onChange={e=>setHighlightDeals(e.target.checked)}/> Sterke deals extra markeren</label></section>}
  <section className="toolbar">
   <label className="upload"><Upload size={18}/>{busy?"Bezig met analyseren…":"Folder-PDF uploaden"}<input type="file" accept="application/pdf" hidden onChange={e=>e.target.files?.[0]&&readPdf(e.target.files[0])}/></label>
   {fileName&&<span className="filename">{fileName}</span>}
   <button onClick={add}><Plus size={17}/>Promo toevoegen</button>
   <button onClick={png}><Download size={17}/>PNG</button><button onClick={pdf}><Download size={17}/>PDF</button><button onClick={excel}><FileSpreadsheet size={17}/>Excel</button><button onClick={pptx} disabled={!!exporting}><Presentation size={17}/>{exporting==="PowerPoint"?"PowerPoint maken…":"PowerPoint"}</button>
  </section>
  {data.warnings.length>0&&<div className="warning"><AlertTriangle size={18}/>{data.warnings.join(" ")}</div>}
  <div className="workspace">
   <aside><h2>Promoties bewerken</h2>{data.promos.map(p=><div className="editor" key={p.id}><input value={p.brand} placeholder="Merk" onChange={e=>patch(p.id,"brand",e.target.value)}/><input value={p.product} onChange={e=>patch(p.id,"product",e.target.value)}/><select value={p.category} onChange={e=>patch(p.id,"category",e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select><input value={p.offer} onChange={e=>patch(p.id,"offer",e.target.value)}/><button className="icon" onClick={()=>remove(p.id)}><Trash2 size={16}/></button></div>)}</aside>
   <section className="preview"><div className={`sheet ${compact?"compact":"spacious"}`} ref={sheetRef}>
    <div className="sheetHead"><div className="brand">MAXI ZOO</div><div><h2>CHEAT SHEET</h2><p>ALLE PROMO'S IN ÉÉN OVERZICHT</p></div><div className="date">{data.period||"Nieuwe periode"}</div></div>
    <div className="grid">{grouped.map(([c,ps])=><section className="cat" key={c} style={{"--cat":colors[c]} as any}><h3>{c}</h3>{ps.map(p=><div className="row" key={p.id}><div><b>{p.brand}</b>{p.brand&&" "}{p.product}{showNotes&&p.notes&&<small>{p.notes}</small>}</div><span className={highlightDeals&&(/70%|50%|14 \+ 6|1 \+ 1|5 \+ 1/i.test(p.offer))?"hot":""}>{p.offer}{p.price&&<em>{p.price}</em>}</span></div>)}</section>)}</div>
    <footer><b>Belangrijk:</b> promoties zijn niet cumuleerbaar, tenzij anders vermeld. Controleer uitzonderingen en deelnemende referenties in de winkel.</footer>
   </div></section>
  </div>
 </main>
}
