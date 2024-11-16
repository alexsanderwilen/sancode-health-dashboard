// // app.config.ts
// import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideHttpClient } from '@angular/common/http';
// import { provideToastr, ToastrModule } from 'ngx-toastr';
// import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideHttpClient(),
//     provideAnimationsAsync(),
//     importProvidersFrom(BrowserAnimationsModule),
//     importProvidersFrom(ToastrModule.forRoot()),
//     provideToastr({ positionClass: 'toast-top-center' })
//   ]
// };

// import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { routes } from './app.routes';
// import { provideHttpClient } from '@angular/common/http';
// import { ToastrModule } from 'ngx-toastr';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }),
//     provideRouter(routes),
//     provideHttpClient(),
//     importProvidersFrom(BrowserAnimationsModule),
//     importProvidersFrom(ToastrModule.forRoot({
//       positionClass: 'toast-top-right', 
//       preventDuplicates: true,
//       closeButton: true,
//       timeOut: 5000
//     }))
//   ]
// };

import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';  // Importação do FormsModule

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(ToastrModule.forRoot({
      positionClass: 'toast-top-right', 
      preventDuplicates: true,
      closeButton: true,
      timeOut: 5000
    })),
    importProvidersFrom(FormsModule)  // Adiciona FormsModule para habilitar ngModel
  ]
};