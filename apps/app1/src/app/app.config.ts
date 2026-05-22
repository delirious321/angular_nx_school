import { ApplicationConfig, provideBrowserGlobalErrorListeners,} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

import { provideHttpClient} from '@angular/common/http';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng, utilities' 
          }
        }
      }
    })
  ],
};