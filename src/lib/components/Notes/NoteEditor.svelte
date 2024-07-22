<script>
import {onMount, onDestroy} from "svelte"; 
import {notes, updateNote, deleteNote} from "$lib/stores/NoteStore.js";

export let noteID;

$: note = $notes.find(n => n.id === noteID);
$: Title = note ? note.Title : '';
$: Description = note ? note.Description : '';

let isDirty = false; 
let syncInterval; 

function markDirty() {
    isDirty = true; 
}

async function syncNote() {
    if (isDirty && note) {
        await updateNote(noteID, {Title, Description});
        isDirty = false; 
    }
}

onMount(() => {
    syncInterval = setInterval(syncNote, 1000); 
})

onDestroy(() => {
    clearInterval(syncInterval); 
    syncNote(); 
})

async function handleDelete() {
    if (note) {
        await deleteNote(noteID);
    }
}

if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', syncNote);
}
</script> 

<div> 
    {#if note}
        <input bind:value={Title} on:input={markDirty} class="text-2xl font-bold w-full p-2 border rounded-md" /> 
        <textarea bind:value={Description} on:input={markDirty} class="w-full p-2 border rounded-md" rows="10"></textarea>
        <button on:click={handleDelete} class="bg-red-500 text-white p-2 rounded-md">Delete</button>
    {:else}
        <p>Loading note...</p>
    {/if}
</div>
