// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.usesigil.app',

  integrations: [
    starlight({
      title: 'Sigil',
      description:
        'Documentation for Sigil, the centrally managed email signature platform for Microsoft 365 and Outlook.',
      logo: {
        src: './src/assets/sigil-mark.png',
        alt: 'Sigil',
      },
      favicon: '/favicon.ico',
      customCss: ['./src/styles/sigil.css'],
      head: [
        // Google tag (gtag.js). Same measurement ID as the marketing site on
        // usesigil.app: the _ga cookie is written on the registrable domain, so
        // a visitor moving between the two keeps one session and one client ID.
        {
          tag: 'script',
          attrs: {
            async: true,
            src: 'https://www.googletagmanager.com/gtag/js?id=G-HQF86KJRT5',
          },
        },
        {
          tag: 'script',
          content: [
            'window.dataLayer = window.dataLayer || [];',
            'function gtag(){dataLayer.push(arguments);}',
            "gtag('js', new Date());",
            "gtag('config', 'G-HQF86KJRT5');",
          ].join('\n'),
        },
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#E8005A' },
        },
        {
          tag: 'link',
          attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        },
      ],
      social: [
        {
          icon: 'external',
          label: 'Sigil portal',
          href: 'https://portal.usesigil.app/admin',
        },
      ],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
      lastUpdated: true,
      sidebar: [
        { label: 'Start here', items: [{ autogenerate: { directory: 'start' } }] },
        { label: 'Deployment', items: [{ autogenerate: { directory: 'deploy' } }] },
        {
          label: 'Signatures',
          items: [{ autogenerate: { directory: 'signatures' } }],
        },
        {
          label: 'Targeting',
          items: [{ autogenerate: { directory: 'targeting' } }],
        },
        {
          label: 'Monitoring',
          items: [{ autogenerate: { directory: 'monitoring' } }],
        },
        {
          label: 'Administration',
          items: [{ autogenerate: { directory: 'admin' } }],
        },
        { label: 'For everyone', items: [{ autogenerate: { directory: 'users' } }] },
        {
          label: 'Partners',
          items: [{ autogenerate: { directory: 'partners' } }],
        },
        {
          label: 'Security and privacy',
          items: [{ autogenerate: { directory: 'security' } }],
        },
        {
          label: 'Reference',
          items: [{ autogenerate: { directory: 'reference' } }],
        },
      ],
    }),
  ],

  // Every page here is prerendered, so images are optimised at build time and
  // emitted as static assets. The adapter's default routes them through the
  // runtime `/_image` endpoint backed by a Cloudflare Images binding, which
  // this Worker has no need for.
  adapter: cloudflare({ imageService: 'compile' }),
});
