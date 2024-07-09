<script> 
  import { onMount } from'svelte';
  import {writable} from'svelte/store';
  import {goto} from "$app/navigation";
  export let taskID=null; 
  import {fetchTasks} from '../TaskStore'; 

  const task=writable({
    title: "",
    description: "",
    dueDate: "",
  })
  async function fetchTaskDetails(){
    if(taskID){
        const res= await fetch(`http://localhost:3000/task/${taskID}`);
        if(res.ok){
            const data=await res.json();
                        task.set(data);
                }
                else{
                    console.log("Error fetching task details"); 

                }
        }
    }
    async function handleSubmit(){
        const currentTask=get(task); 
        let res; 
        if(taskID){
            res =await fetch(`http://localhost:3000/task/${taskID}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(currentTask)
            });;
        }
        else{
            res=await fetch(`http://localhost:3000/task`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(currentTask)
            });
        }
        if (res.ok){
            fetchTasks(); 
            

            goto("/tasks");
        }
    }
  
  onMount(fetchTaskDetails);

</script> 


<div class="py-4">
  <h1 class="text-2xl font-semibold mb-4">{formMode}</h1>
  
  <form on:submit|preventDefault={handleSubmit}>
    <div class="mb-4">
      <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
      <input type="text" id="title" bind:value={$task.title} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
    </div>

    <div class="mb-4">
      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
      <textarea id="description" bind:value={$task.description} rows="3" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"></textarea>
    </div>

    <div class="mb-4">
      <label for="dueDate" class="block text-sm font-medium text-gray-700">Due Date</label>
      <input type="date" id="dueDate" bind:value={$task.dueDate} class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
    </div>

    <div class="mt-6">
      <button type="submit" class="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">{taskId ? "Update Task" : "Add Task"}</button>
    </div>
  </form>
</div>
