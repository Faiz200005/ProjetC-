import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // <-- Ajoute withInterceptors
import { authInterceptor } from './services/auth.interceptor'; // <-- Importe ton interceptor

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // On configure le Client HTTP pour qu'il utilise notre Interceptor
    provideHttpClient(withInterceptors([authInterceptor])) 
  ]
};