import {writable} from 'svelte/store'; 

export const notes=writable([]); 

export async function fetchNotes(){
   const res= await fetch('http://localhost:8000/notehandler/notes')
   if (res.ok){
    const data = await res.json(); 
    notes.set(data); 

   }
}
export async function createNote(){
   const newNote={
      
      Title: writable(''),
      Content: writable('')
      
   }
   const res= await fetch('http://localhost:3000/notehandler/notes',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(newNote)
   })
   if (res.ok){
    const data = await res.json();
    return createdNote.ID; 
    
}
else {
    throw new Error('Failed to create note');
}

}
export async function updateNote(id, updatedNote){
    const res= await fetch(`http://localhost:3000/notehandler/notes/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(updatedNote)
    })
    if (res.ok){
        const data = await res.json();
        return data;

    }
    else {
        throw new Error('Failed to update note');
    }

    }
export async function deleteNote(id){
    const res= await fetch(`http://localhost:3000/notehandler/notes/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    })
    if (res.ok){
        const data = await res.json();
        return data;}
        else {
            throw new Error('Failed to delete note');
        }
      }

export async function getNote(id){
    const res= await fetch(`http://localhost:3000/notehandler/notes/${id}`)
    if (res.ok){
        const data = await res.json();
        return data;}
        else {
            throw new Error('Failed to get note');
        }
      }





