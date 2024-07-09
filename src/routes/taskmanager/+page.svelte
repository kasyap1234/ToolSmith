<script> 
  import { onMount } from'svelte';
  import {page} from '$app/stores'; 
  import TaskDetails from '$lib/components/Tasks/TodoDetails.svelte';
 
  let taskID; 
  onMount(()=> {
    taskID= $page.params.taskID; 
    if(taskID){
        fetchTaskDetails();

    }
  })
</script> 
<TaskDetails taskID={taskID}/>
<style > 
</style> 
