<script> 
import {onMount} from'svelte';
import {notes,fetchNotes} from "$lib/components/Notes/NoteStore.js";

onMount(fetchNotes); 

</script> 
<div > 
    <h2 class="text-xl font-semibold mb-4"> Notes </h2>
    {#each $notes as note(note.ID)}
    <div class="mb-2"> 
        <a href={`/notes/${note.ID}`} class="block p-2 bg-violet-500">
            <h3 class="font-semibold">{note.Title}</h3>
          </a>
          </div>
          {:else}
          <p> No Notes found </p>
          {/each}

    </div>

