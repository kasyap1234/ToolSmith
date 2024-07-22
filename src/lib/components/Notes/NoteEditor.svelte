<script>
import { onMount, onDestroy } from "svelte"; 
import { notes, updateNote, deleteNote } from "$lib/stores/NoteStore.js";

export let noteId;

$: note = $notes.find(n => n.id === noteId);
$: title = note ? note.title : '';
$: content = note ? note.content : '';

let isDirty = false; 
let syncInterval; 

function markDirty() {
    isDirty = true; 
}

async function syncNote() {
    if (isDirty && note) {
        await updateNote(noteId, { title, content });
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
        await deleteNote(noteId);
    }
}
</script> 

<div> 
    {#if note}
        <input bind:value={title} on:input={markDirty} class="text-2xl font-bold w-full p-2 border rounded-md" /> 
        <textarea bind:value={content} on:input={markDirty} class="w-full p-2 border rounded-md" rows="10"></textarea>
        <button on:click={handleDelete} class="bg-red-500 text-white p-2 rounded-md">Delete</button>
    {:else}
        <p>Loading note...</p>
    {/if}
</div>
