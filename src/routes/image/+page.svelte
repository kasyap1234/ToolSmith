<!-- 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 -->
<script>
  import { onMount } from 'svelte';
  import {writable} from'svelte/store';
import {Spinner, Button,Input } from 'flowbite-svelte';

  let inputText = '';
  let imageUrl = '';
  let loading = false;

  async function generateImage() {
    loading = true;
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: inputText }),
        }
      );

      const blob = await response.blob();
      imageUrl = URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      loading = false;
    }
  }
</script>

<style>


 
 


</style>

<div class="container mx-auto max-w-screen-md ">
  <h1 class="text-xl font-bold mb-6 text-center"> Image Generator </h1>
  <div class="mb-4">
    <Input
      type="text"
      placeholder="Enter text to generate image"
      bind:value={inputText}
      class="w-full mb-4 h-16  focus:ring-violet-500"
    />
  </div>
  <div class="mx-auto">
  <Button class="bg-violet-500 mx-auto  hover:bg-violet-600 mt-1" on:click={generateImage} disabled={loading}>Generate Image</Button>

</div>
  {#if loading}
  <div class="mt-6">
     <Button>
    <Spinner class="me-3" size="4" color="white" />
    Loading ...
  </Button>
</div>
  {/if}

  {#if imageUrl && !loading}
    <div class="w-full h-auto mt-6">
      
      <img src={imageUrl} alt="Generated Image" />
    </div>
  {/if}
</div>
