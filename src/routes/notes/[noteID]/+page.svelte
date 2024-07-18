<script context="module">
  export async function load({ params }) {
    return {
      props: {
        noteId: params.noteId,
      },
    };
  }


 import NoteDisplay from '$lib/Notes/NoteDisplay.svelte';
 export let noteId;

</script>

<NoteDisplay noteID={noteId} />


