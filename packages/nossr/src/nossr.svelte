<div>
  {#if process.browser}
    <slot />
  {:else}
    <slot name="ssr" />
  {/if}
</div>
