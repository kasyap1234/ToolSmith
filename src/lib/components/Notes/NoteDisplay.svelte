<script> 
import {onMount} from'svelte';
import {writable} from "svelte/store"; 

export let noteID; 
const note =writable({
   ID: '',
  Title: '',
  Description: '',

})
async function fetchNoteDetails(){
    const res= await fetch(`http://localhost:3000/notehandler/note/${noteID}`)
    if (res.ok){
        const data= await res.json(); 
        note.set(data); 

    }
    else{
        console.log(`Error: ${res.status}`);

    }
}
onMount(fetchNoteDetails); 

</script> 
{#if $note.ID}
<div> 
    <h1 class="text-2xl font-semibold mb-4"> {$note.Title} </h1>
    <p class="text-gray-700"> {$note.Description} </p>
    
    </div>
    {:else}
    <p> Loading .... </p>
    {/if}


