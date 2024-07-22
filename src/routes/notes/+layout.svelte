<script>
import NoteSidebar from '$lib/components/Notes/NoteSidebar.svelte';
import NoteEditor from '$lib/components/Notes/NoteEditor.svelte';

let selectedNoteID = null;

function handleNoteSelect(event) {
    selectedNoteID = event.detail.noteID;
    console.log("selectedNoteID",selectedNoteID)
}
</script>

<div class="flex">
    <div class="w-1/3">
        <NoteSidebar on:selectnote={handleNoteSelect} />
    </div>
    <div class="w-2/3">
        {#if selectedNoteID}
            <NoteEditor noteID={selectedNoteID} />
        {:else}
            <p>Select a note or create a new one</p>
        {/if}
    </div>
</div>

<slot /> 

