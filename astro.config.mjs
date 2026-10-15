// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeMermaid from 'rehype-mermaid';

export default defineConfig({
  site: 'https://dev-deee.github.io',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    // Inline small stylesheets so pages render without an extra request.
    inlineStylesheets: 'always',
  },
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      // Mermaid blocks are turned into diagrams by rehype-mermaid below, not highlighted as code.
      excludeLangs: ['mermaid'],
    },
    rehypePlugins: [
      [
        rehypeMermaid,
        {
          // Render ```mermaid blocks to static SVG at build time (no diagram JavaScript in the
          // browser), with a light and a dark version that follow the visitor's system theme.
          strategy: 'img-svg',
          mermaidConfig: { theme: 'neutral', fontFamily: 'system-ui, sans-serif' },
          dark: { theme: 'dark', fontFamily: 'system-ui, sans-serif' },
          // Uses the Google Chrome already installed locally and on GitHub's Ubuntu runners.
          launchOptions: { channel: 'chrome' },
        },
      ],
    ],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
