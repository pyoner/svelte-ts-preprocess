# No SSR preprocessor for Svelte

This `preprocessor` remove a code from the `script` tag, see example:

```html
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
```

## Instalation

```bash
npm i -D @pyoner/svelte-nossr-preprocess
```

## How to use the preprocessor?

Import `nossr` preprocessor:

```js
import { nossr } from "@pyoner/svelte-nossr-preprocess";
```

Add to your `rollup` config file
