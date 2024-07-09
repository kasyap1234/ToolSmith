<script> 
export async function load({params}){
    return {props: {taskID: params.id}}

}
import EditTask from '$lib/components/Tasks/EditTask.svelte';
export let taskID; 

</script> 
<EditTask taskID={taskID}/>

