<script nossr>
  // client only code
  console.log("No SSR");
  let x = 5;
</script>

<nossr>
  <h1>No SSR</h1>
  {x}
</nossr>
