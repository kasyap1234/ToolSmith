<script>
import NoteSidebar from '$lib/components/Notes/NoteSidebar.svelte';
import NoteEditor from '$lib/components/Notes/NoteEditor.svelte';
import { fetchNotes } from '$lib/stores/NoteStore.js';
import { onMount } from 'svelte';

let selectedNoteId = null;

function handleNoteSelect(event) {
    selectedNoteId = event.detail.noteId;
}

onMount(fetchNotes);
</script>

<div class="flex">
    <div class="w-1/3">
        <NoteSidebar on:selectnote={handleNoteSelect} />
    </div>
    <div class="w-2/3">
        {#if selectedNoteId}
            <NoteEditor noteId={selectedNoteId} />
        {:else}
            <p>Select a note or create a new one</p>
        {/if}
    </div>
</div>

<slot />
