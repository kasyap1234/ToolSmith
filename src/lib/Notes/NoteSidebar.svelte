<script> 
import {onMount} from'svelte';
import {notes,fetchNotes} from '$lib/stores/notes';
onMount(fetchNotes); 

</script> 
