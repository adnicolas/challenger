import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
	providers: [
		// eslint-disable-next-line max-len
		importProvidersFrom([BrowserAnimationsModule])
	]
};
