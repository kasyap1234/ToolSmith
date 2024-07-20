<script> 

import {notes,createNote} from '$lib/stores/NoteStore.js'; 

import {createEventDispatcher} from "svelte";
const dispatch=createEventDispatcher();


async function handleCreateNote(title,description){
    const newNote= await createNote(title,description);
    if(newNote){
        dispatch("created",{noteID: newNote.ID})
    }
}
function handleNoteClick(noteID){
    dispatch("selectnote",{noteID}); 

}


</script> 
<div > 
    {#if $notes}
    <h2 class="text-xl font-semibold mb-4"> Notes </h2>
    <button on:click={()=> handleCreateNote(note.Title,note.Description)} class="bg-violet-500 text-white p-2 rounded-lg"> Add Note </button>

    {#each $notes as note(note.ID)}
    <div class="mb-2"> 
       <button on:click={()=> handleNoteClick(note.ID)} class="bg-gray=100 p-2 rounded-lg w-full text-center"> <h3 class="font-semibold">{note.Title}</h3></button>

        
          </div>
          {:else}
          <p> No Notes found </p>
          {/each}

          
    </div>

