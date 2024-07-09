import { writable } from "svelte/store";
export const tasks=writable([]);
export async function fetchTasks(){
    const response= await fetch("http://localhost:3000/tasks");
    if (response.ok){
        const data= await response.json();
        tasks.set(data);
    }
}
export async function deleteTask(taskID){
    const res= await fetch(`http://localhost:3000/tasks/${taskID}`,{
        method:"DELETE"
    });
    if (res.ok){
        fetchTasks(); 

    }
}
export async function editTask(taskID,newTask){
    const res= await fetch(`http://localhost:3000/tasks/${taskID}`,{
        method:"PUT",
        body:JSON.stringify(newTask)
    });
    if (res.ok){
        fetchTasks();
    }
}