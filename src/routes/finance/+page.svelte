<script>
  import { writable } from 'svelte/store';
  import { Label, Input, Range, Button } from 'flowbite-svelte'; 

  // Stores for form inputs
  let MonthlyInvestment = writable('0');
  let Interest = writable('0');
  let Duration = writable('1');
  let Total = writable('0');

  // Function to handle form submission
  const handleClick = async (event) => {
    event.preventDefault();

    const requestBody = {
      MonthlyInvestment: String($MonthlyInvestment), // Convert to string
      Interest: String($Interest), // Convert to string
      Duration: String($Duration), // Convert to string
    };

    try {
      const response = await fetch('http://localhost:3000/finance/SIP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log(requestBody); 

      // Log response text before parsing
      const responseText = await response.text();
      console.log('Response Text:', responseText);

      if (!response.ok) {
        throw new Error(`Failed to submit form: ${response.statusText}`);
      }

      // Parse the response JSON
      const data = JSON.parse(responseText);
      console.log("data is ", data);

      Total.set(data); // Assuming API response contains a Total field
    } catch (error) {
      console.error(error); 
    }
  };
</script>

<div class="container mx-auto max-w-sm">
  <h1 class="text-center text-4xl font-bold mb-4">SIP Calculator</h1>
  <form method="POST" on:submit|preventDefault={handleClick}>

    <Label class="mb-4">Monthly Investment Value</Label>
    <Range class="mb-4" id="range-minmax" min="0" max="1000000" bind:value={$MonthlyInvestment} />
    <Input class="mb-4" type="number" id="sip" bind:value={$MonthlyInvestment} />

    <Label class="mb-4" for="gain">Yearly Increment</Label>
    <Range class="mb-4" id="gain" min="0" max="200" bind:value={$Interest} /> 
    <Input type="number" id="gain" bind:value={$Interest} />

    <Label class="mb-4" for="time">Duration</Label>
    <Range class="mb-4" id="time" min="1" max="100" bind:value={$Duration} />
    <Input type="number" class="mb-4" id="time" bind:value={$Duration} />

    <Button type="submit" class="mb-4 bg-blue-600 hover:bg-blue-500">Calculate</Button>

    <Label type="text" id="total" class="mb-4">Total</Label>
    <p class="text-green-400  text-xl font-medium text-center">Final Amount is : {$Total}</p> <!-- Bind Total store directly here -->

  </form>
</div>
