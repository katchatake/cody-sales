import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { semanticTokens } from '../config/theme';
import '@mdi/font/css/materialdesignicons.css';
import { defineNuxtPlugin } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: 'semanticTheme',
      themes: {
        semanticTheme: semanticTokens,
      },
    },
    defaults: {
      VCard: {
        elevation: 3, 
      },
      VBtn: {
        color: 'brand-primary', 
      },
      VTextField: {
        variant: 'outlined',
        color: 'brand-primary',
        bgColor: 'surface-elevated',
        rounded: 'lg'
      }
    }
  });

  nuxtApp.vueApp.use(vuetify);
});
