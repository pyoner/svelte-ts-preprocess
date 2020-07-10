<script nossr>
  import Nossr from "@pyoner/svelte-nossr-preprocess/src/nossr.svelte";
  // client only code
  console.log("No SSR");
  let x = 5;
</script>

<Nossr>
  <h1>No SSR</h1>
  {x}
  <div slot="ssr">
    <h1>SSR</h1>
  </div>
</Nossr>
