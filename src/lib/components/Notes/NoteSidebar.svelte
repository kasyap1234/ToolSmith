<script>
import {notes, createNote} from "$lib/stores/NoteStore.js";
import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();

async function handleCreateNote() {
    const newNote = await createNote('New Note', '');
    console.log(newNote);
    console.log("store notes are ",$notes); 

    dispatch("selectnote", { noteID: newNote.id });
}

function handleNoteClick(noteID) {
    console.log("handleNoteClick" ,noteID); 

    dispatch("selectnote", { noteID });
}
</script>

<div class="p-4">
    <h2 class="text-xl font-semibold mb-4">Notes</h2>
    <button 
        on:click={handleCreateNote} 
        class="bg-violet-500 text-white p-2 rounded-lg mb-4 w-full"
    >
        New Note
    </button>

    {#each $notes as note (note.id)}
        <div class="mb-2">
            <button 
                on:click={() => handleNoteClick(note.ID)} 
                class="bg-gray-100 p-2 rounded-lg w-full text-left hover:bg-gray-200 transition-colors"
            >
                <h3 class="font-semibold truncate">{note.Title || 'Untitled'}</h3>
            </button>
        </div>
    {/each}
</div>
