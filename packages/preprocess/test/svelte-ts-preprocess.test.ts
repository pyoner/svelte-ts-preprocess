import { preprocess } from '../src/svelte-ts-preprocess'

describe('preprocess test', () => {
  const opts = { hideErrors: true }

  it('should be function', () => {
    expect(preprocess).toBeInstanceOf(Function)
  })

  it('returns object with "script" property', () => {
    expect(preprocess(opts)).toHaveProperty('script')
  })

  it('run preprocess', () => {
    // const code = ``
    const content = `//comment
import Form from './Form.svelte';

function x(){return 5;}
console.log(x())
let c: number = 5;
`
    const filename = 'Component.svelte'
    const attributes = {
      lang: 'ts'
    }
    const result = preprocess(opts).script({
      content,
      filename,
      attributes
    })
    expect(result).toHaveProperty('code')
  })

  it('should preserve all imports', () => {
    const content = `import Form from './Form.svelte';
import x from 'x-lib';
`
    const filename = 'Component.svelte'
    const attributes = {
      lang: 'ts'
    }
    const result = preprocess(opts).script({
      content,
      filename,
      attributes
    })
    expect(result).toHaveProperty('code', content)
  })

  it('should remove types imports', () => {
    const content = `import Form from './Form.svelte';
import type x from 'x-lib';
let a: x = 5;
`
    const expected = `import Form from './Form.svelte';
let a = 5;
`
    const filename = 'Component.svelte'
    const attributes = {
      lang: 'ts'
    }
    const result = preprocess(opts).script({
      content,
      filename,
      attributes
    })
    expect(result).toHaveProperty('code', expected)
  })

  it('should hide errors', () => {
    const content = `import Form from './Form.svelte';
import x from 'x-lib';
`
    const filename = 'Component.svelte'
    const attributes = {
      lang: 'ts'
    }
    const opts = { hideErrors: true }
    const result = preprocess(opts).script({
      content,
      filename,
      attributes
    })
    expect(result).toHaveProperty('code', content)
  })

  it('should support external .ts files', () => {
    const content = ''
    const filename = 'Component.svelte'
    const attributes = {
      lang: 'ts',
      src: 'src/svelte-ts-preprocess.ts'
    }
    const result = preprocess(opts).script({
      content,
      filename,
      attributes
    })
    expect(result).toHaveProperty('code')
  })
})
