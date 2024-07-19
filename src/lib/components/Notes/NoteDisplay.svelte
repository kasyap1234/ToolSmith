<script>
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { getNote, updateNote } from "$lib/components/Notes/NoteStore.js";

	export let noteID;
	let note = writable({
		ID: "",
		Title: "",
		Description: "",
	});
	let isEditing = false;

	async function fetchNoteDetails() {
		if (noteID) {
			note = await getNote(noteID);
			isEditing = false;
		}
	}
	async function handleSaveNote() {
		const updatedNote = await updateNote(noteID, note);
        if(updatedNote){
            isEditing=false;
            return updatedNote; 
            
        }
		
	}

	$: if (noteID) fetchNoteDetails();
</script>

{#if note.ID}
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

