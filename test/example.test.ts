import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Card from '@components/Card/index.astro';

test('Card with slots', async () => {
  const container = await AstroContainer.create();

  const result = await container.renderToString(Card, {
    props: { name: 'post-0' },
  });

  expect(result).toContain('const blogdata = await getEntry("blog", post-0)');
});

// import { assert, describe, expect, it } from 'vitest'

// describe('suite name', () => {
//   it('foo', () => {
//     expect(1 + 1).toEqual(2)
//     expect(true).to.be.true
//   })

//   it('bar', () => {
//     assert.equal(Math.sqrt(4), 2)
//   })

//   it('snapshot', () => {
//     expect({ foo: 'bar' }).toMatchSnapshot()
//   })
// })
