import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { MessageService,ConfirmationService } from 'primeng/api';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core'; // Import du cœur d'echarts
document.documentElement.lang="fr"


// 2. Importer les graphiques requis (Exemple : Barres et Lignes)
import { BarChart, LineChart, PieChart } from 'echarts/charts';

// 3. Importer les composants de structure obligatoires pour l'affichage
import { 
  GridComponent, 
  TooltipComponent, 
  LegendComponent, 
  TitleComponent 
} from 'echarts/components';

// 4. Importer le moteur de rendu Canvas (Résout l'erreur Renderer 'undefined')
import { CanvasRenderer } from 'echarts/renderers';

// 5. Enregistrer manuellement tous ces composants dans ECharts
echarts.use([
  BarChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  CanvasRenderer, // 
  PieChart
]);


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        loadingInterceptor,
        authInterceptor,
        errorInterceptor
      ])
    ),
   providePrimeNG({
     ripple: true,
      theme: {
        preset: Aura,
        options: {
              prefix: 'p',
              darkModeSelector: ".my-app-dark",//'system',
              cssLayer: false,
              cssVariables: true
                },
               
      }
    }),
    MessageService,
    ConfirmationService,
    provideEchartsCore({echarts})
  ]
};
