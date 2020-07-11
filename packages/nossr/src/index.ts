interface Script {
  filename: string;
  content: string;
  attributes: {
    nossr?: string;
  };
}

interface Markup {
  content: string;
  filename: string;
}

function script({ attributes }: Script) {
  const { nossr } = attributes;
  if (nossr !== undefined) {
    return {
      code: ""
    };
  }
}

const p = /\<nossr\>(.|\n)*?\<\/nossr\>/gim;
function markup({ content }: Markup) {
  const code = content.replace(p, "");
  return { code };
}

export function nossr() {
  return {
    script,
    markup
  };
}
