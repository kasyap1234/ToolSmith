<script>
import {onDestroy } from "svelte";
import { notes, updateNote, deleteNote } from "$lib/stores/NoteStore.js";
import { debounce } from 'lodash-es';

export let noteId;

$: note = $notes.find(n => n.id === noteId);

const debouncedSync = debounce(async () => {
    if (note) {
        await updateNote(noteId, { title: note.Title, content: note.Content });
    }
}, 500);

function handleInput() {
    debouncedSync();
}

onDestroy(() => {
    debouncedSync.flush();
});

async function handleDelete() {
    if (note) {
        await deleteNote(noteId);
    }
}
</script>

<div>
    {#if note}
        <input bind:value={note.Title} on:input={handleInput} class="text-2xl font-bold w-full p-2 border rounded-md" />
        <textarea bind:value={note.Content} on:input={handleInput} class="w-full p-2 border rounded-md" rows="10"></textarea>
        <button on:click={handleDelete} class="bg-red-500 text-white p-2 rounded-md">Delete</button>
    {:else}
        <p>Loading note...</p>
    {/if}
</div>
