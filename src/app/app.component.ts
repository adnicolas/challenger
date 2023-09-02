import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableComponent } from '@infrastructure/components/table/table.component';

@Component({
	selector: 'challenger-root',
	standalone: true,
	imports: [TableComponent],
	templateUrl: './app.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
