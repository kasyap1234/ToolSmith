<script> 
let Title=''; 
let Description=''; 
function handleSubmit(){
    console.log(Title,Description);
}

</script> 
<form on:submit="{handleSubmit}"prevent-default>
<input bind:value={Title} class="p-4 border rounded-lg mb-4 w-full" type="text" placeholder="Title" />
<textarea bind:value={Description} class="p-4 border rounded-lg mb-4 w-full" placeholder="Description" />
    </form>