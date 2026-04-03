import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // As Nuxt 4 minimal template uses the srcDir strategy or auto-imports inside `app`, 
  // We can explicitly point srcDir if needed, but the minimal template handles it.
  
  build: {
    transpile: ['vuetify'],
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  
  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  
  vite: {
    plugins: [
      tsconfigPaths()
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  
  css: [
    '~/assets/scss/global.scss'
  ],
  
  app: {
    head: {
      title: 'Cody Sales App',
      meta: [
        { name: 'description', content: 'Cody Sales Application' }
      ]
    }
  }
});
