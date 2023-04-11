import { defineConfig } from 'dumi';

export default defineConfig({
  base:"/hxjg-utils/",
  publicPath:"/hxjg-utils/",
  exportStatic: {},
  outputPath: 'docs-dist',
  alias: {
    // 让插件指向当前目录下
    '@hxjg/utils': process.cwd() + '/src/index.ts',
  },
  themeConfig: {
    name: '@hxjg/utils',
    nav: [{ title: '工具类', link: '/tool/tree-tool/flatten-tree' }],
  },
  resolve: {
    atomDirs: [],
  },
});
