<script>
import { notes, createNote } from "$lib/stores/NoteStore.js";
import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();

async function handleCreateNote() {
    const newNote = await createNote('New Note', '');
    dispatch("selectnote", { noteId: newNote.id });
}

function handleNoteClick(id) {
    dispatch("selectnote", { noteId: id });
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
                on:click={() => handleNoteClick(note.id)} 
                class="bg-gray-100 p-2 rounded-lg w-full text-left hover:bg-gray-200 transition-colors"
            >
                <h3 class="font-semibold truncate">{note.title || 'Untitled'}</h3>
            </button>
        </div>
    {/each}
</div>
