import type { Folder, Promotion } from "./types";
const base=(data:Partial<Promotion>&Pick<Promotion,"id"|"productName"|"promotionText"|"animalCategory">):Promotion=>({brand:"",description:"",promotionType:"Multi-buy",normalPrice:"",promotionalPrice:"",unitPrice:"",validFrom:"01/07/2026",validUntil:"31/07/2026",sourcePage:1,productImage:"",isFriendsOffer:false,isMaxiDeal:false,isOutlet:false,isPickAndMix:false,notes:"",confidence:.92,validationWarnings:[],...data});
export const sampleFolder:Folder={id:"demo",name:"Demofolder Maxi Zoo België",importedAt:new Date(2026,6,15).toISOString(),period:"01/07/2026 – 31/07/2026",pages:[],promotions:[
base({id:"1",brand:"PREMIERE",productName:"Natvoer kat 12 × 85 g",promotionText:"5 + 1 gratis",animalCategory:"Cat"}),
base({id:"2",brand:"SELECT GOLD",productName:"Droogvoer hond 12 kg",promotionText:"2e aan -50%",animalCategory:"Maxi Deals",isMaxiDeal:true}),
base({id:"3",brand:"MultiFit",productName:"Bodembedekking",promotionText:"20% korting met Friends",animalCategory:"Rabbit and rodents",promotionType:"Friends price",isFriendsOffer:true}),
base({id:"4",brand:"AniOne",productName:"Geselecteerde accessoires",promotionText:"Tot 50% korting",animalCategory:"Outlet",promotionType:"Outlet",isOutlet:true})]};
