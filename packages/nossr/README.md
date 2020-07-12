# No SSR preprocessor for Svelte

This `preprocessor` remove a code from the `script` tag, see example:

```html
<script nossr>
  // client only code
  console.log("No SSR");
  let x = 5;
</script>

<!-- inside the tag "nossr" all data will be removed by the preprocessor  -->
<nossr>
  <h1>No SSR</h1>
  {x}
</nossr>
```

## Instalation

```bash
npm i -D @pyoner/svelte-nossr-preprocess
```

## How to use the preprocessor?

See the [rollup config](https://github.com/pyoner/svelte-typescript/blob/master/packages/sapper-template/rollup.config.js) for Sapper
