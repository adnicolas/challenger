import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
	providers: [
		// eslint-disable-next-line max-len
		// see: https://stackoverflow.com/questions/72504142/how-to-add-browseranimationsmodule-or-noopanimationsmodule-to-standalone-compone/72504735#72504735
		importProvidersFrom([BrowserAnimationsModule])
	]
};
