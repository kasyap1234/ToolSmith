<script>
import {updateNote,notes} from '$lib/stores/NoteStore.js'; 
export let noteID; 

$: note=noteID ? $notes.find(n => n.ID==noteID): null;
let isEditing=false; 
function handleSaveNote(){
if(note){
	try {
	updateNote(noteID,{Title: note.Title,Description: note.Description})

	isEditing=false; 

	}
	catch(err){
		console.err("Error updating note",err);

	}
}
}

</script>

{#if note}
<div> 
    {#if isEditing}
    <input bind:value={note.Title} class="text-2xl font-semibold mb-4 2-full" /> 
    <textarea bind:value={note.Description} class="w-full h-64 p-2 border rounded" /> 
    <button on:click={handleSaveNote} class="mt-4 p-2 bg-blue-600 text-white rounded"> Save Note </button>
    {:else}
    <h1 class="text-2xl font-semibold mb-4"> {note.Title} </h1>
    <p class="bg-white"> {note.Description}</p>
    <button on:click={()=> isEditing=true} class="mt-4 p-2 bg-yellow-400 text-white rounded-md"> Edit Note </button>
    {/if}
    </div>
    {:else}
    <p> Select a note or create  a new one </p>
    {/if}

