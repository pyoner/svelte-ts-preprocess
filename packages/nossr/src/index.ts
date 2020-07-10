interface Script {
  filename: string;
  content: string;
  attributes: {
    nossr?: string;
  };
}

function script({ content, attributes }: Script) {
  const { nossr } = attributes;
  if (nossr !== undefined) {
    return {
      code:
        'import Nossr from "@pyoner/svelte-nossr-preprocess/src/nossr.svelte";'
    };
  }
}

export function nossr() {
  return {
    script
  };
}
