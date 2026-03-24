import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app/app.routes';

// 1. On importe withInterceptors
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// 2. On importe ton intercepteur (vérifie juste que le chemin correspond bien à ton dossier)
import { authInterceptor } from './app/services/auth.interceptor'; 

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    
    // 3. LA MAGIE OPÈRE ICI : On attache enfin l'intercepteur au démarrage !
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
}).catch(err => console.error(err));