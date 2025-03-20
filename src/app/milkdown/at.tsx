import { $inputRule, $node, $remark } from '@milkdown/kit/utils';
import { InputRule } from '@milkdown/kit/prose/inputrules';
import directive from 'remark-directive';

const atHighlightDirective = $remark('remarkDirective', () => directive);

const atDirectiveNode = $node('highlight', () => ({
  group: 'inline',
  inline: true,
  attrs: {
    text: { default: '' },
  },
  parseDOM: [{
    tag: 'span[data-highlight]',
    getAttrs: (dom) => ({
      text: (dom as HTMLElement).textContent,
    }),
  }],
  toDOM: (node) => [
    'span',
    {
      'data-highlight': true,
      style: `
        color: #333; /* 字体颜色 */
        background-color: #fff9c4; /* 柔和的黄色背景 */
        border-radius: 4px; /* 圆角 */
        padding: 2px 4px; /* 内边距 */
        border: 1px solid #fff9c4; /* 细边框 */
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2); /* 轻微阴影 */
        font-weight: 500; /* 字体稍微加粗 */
      `,
    },
    `@${node.attrs.text}`,
  ],
  parseMarkdown: {
    match: (node) => node.type === 'textDirective' && node.name === 'highlight',
    runner: (state, node, type) => {
      const text = node.children && node.children[0] && 'value' in node.children[0] 
        ? node.children[0].value 
        : ''; // 如果 children 为空，则默认空字符串
      state.addNode(type, { text });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === 'highlight',
    runner: (state, node) => {
      state.addNode('textDirective', undefined, node.attrs.text, { name: 'highlight' });
    },
  }
}));

const atInputRule = $inputRule((ctx) => new InputRule(/@([^\n\r]+)/, (state, match, start, end) => {
  const [okay, text = ''] = match;
  const { tr } = state;
  if (okay) {
    tr.replaceWith(start, end, atDirectiveNode.type(ctx).create({ text }));
  }

  return tr;
}));

export { atHighlightDirective, atDirectiveNode, atInputRule };