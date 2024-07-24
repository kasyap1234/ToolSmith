import { writable } from "svelte/store";

export const notes=writable([]);

export async function createNote(Title, Description){
    const newNote={
      
        Title: Title, 
        Description: Description 
    }
    const res=await fetch('http://localhost:3000/notehandler/notes',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newNote)
    })
    if(res.ok){
        const createdNote= await res.json(); 
       notes.update(currentNotes => [...currentNotes, createdNote]);
       

       return notes; 



    }
}

export async function updateNote(id, updatedNote) {
    const res = await fetch(`http://localhost:3000/notehandler/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedNote)
    });
    if (res.ok) {
        const data = await res.json();
        notes.update(currentNotes =>
            currentNotes.map(note => note.id === id ? { ...note, ...data } : note)
        );
        return data;
    }
    throw new Error('Failed to update note');
}


export async function deleteNote(id){
    const res=await fetch(`http://localhost:3000/notehandler/notes/${id}`,{
        method:'DELETE'
    })
    if(res.ok){
        notes.update(notes => notes.filter(note => note.id!== id));
        return ;}
        else{
            throw new Error('Failed to delete note');
        }
    }

export async function fetchNotes(){
        const res=await fetch('http://localhost:3000/notehandler/notes')
        if(res.ok){
            const fetchedNotes= await res.json();
            notes.set(fetchedNotes);
        }
        else{
            throw new Error('Failed to fetch notes');
        }
    }

