import React,{createContext,useContext,useState} from 'react';
import {publicContact} from './publicContact';

const SupportContactContext=createContext(null);
export function SupportContactProvider({children}){
 const [phone,setPhone]=useState(publicContact.phone);
 return <SupportContactContext.Provider value={{phone,setPhone,email:publicContact.email}}>{children}</SupportContactContext.Provider>;
}
export const useSupportContact=()=>useContext(SupportContactContext);
