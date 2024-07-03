<script>
  import { Range, Label } from 'flowbite-svelte';
  let minmaxValue = 0;
</script>
<div class="container">
<Label>Monthly Investment Value </Label>
<Range id="range-minmax" min="0" max="1000000" bind:value={minmaxValue} />
<p>Value: {minmaxValue}</p>
</div>
