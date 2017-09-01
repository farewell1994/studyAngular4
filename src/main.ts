import { enableProdMode } from '@angular/core';
//імпортує функціональність модуля platformBrowserDynamic з пакета angular/platform-browser-dynamic.
// platformBrowserDynamic використовує bootstrapModule для загрузки модуля.
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
