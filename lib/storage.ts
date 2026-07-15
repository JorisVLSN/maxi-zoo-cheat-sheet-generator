import { openDB } from "idb";
import type { Folder } from "./types";
const database=()=>openDB("maxi-zoo-cheat-sheets",1,{upgrade(db){if(!db.objectStoreNames.contains("folders"))db.createObjectStore("folders",{keyPath:"id"});}});
export async function saveFolder(folder:Folder){return(await database()).put("folders",folder);}
export async function loadFolders():Promise<Folder[]>{return(await database()).getAll("folders");}
