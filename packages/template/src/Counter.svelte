<script lang="ts">
  import type { Num } from './types'
  export let value: Num = 0;
  export let step: Num = 1;
</script>

<div>
  <slot>Default Counter</slot>
  <div>
     {value}
    <button on:click={() => (value += step)}>+</button>
    <button on:click={() => (value -= step)}>-</button>
  </div>
</div>
