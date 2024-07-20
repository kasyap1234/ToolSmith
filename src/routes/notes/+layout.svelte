<script> 
import NoteSidebar from '$lib/components/Notes/NoteSidebar.svelte'; 
import NoteDisplay from '$lib/components/Notes/NoteDisplay.svelte'; 
let noteID=null ; 
function handleSelectNote(event){
    noteID=event.detail.noteID;
}

</script>
<div class="flex"> 
    <div class="w-1/4 bg-gray-300"> 
<NoteSidebar on:selectNote={handleSelectNote}/>

</div> 
<div class="w-3/4 p-4 "> 
    <NoteDisplay noteID={noteID}/> 

    </div>
</div> 
<slot> </slot>







