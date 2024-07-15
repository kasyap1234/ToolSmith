import {writable} from 'svelte/store'; 
import { resolveConfig } from 'vite';
export const notes=wrtiable([]); 

export async function fetchNotes(){
   const res= await fetch('http://localhost:8000/notehandler/notes')
   if (res.ok){
    const data = await res.json(); 
    notes.set(data); 

   }
}