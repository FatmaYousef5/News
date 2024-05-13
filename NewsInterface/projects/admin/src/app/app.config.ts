import { ApplicationConfig } from '@angular/core';
import { provideRouter, } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient,provideHttpClient,withFetch} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), HttpClient,provideHttpClient(withFetch())]
};
