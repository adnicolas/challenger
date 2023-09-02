import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChipsComponent } from '@infrastructure/components/chips/chips.component';
import { TableComponent } from '@infrastructure/components/table/table.component';

@Component({
	selector: 'challenger-root',
	standalone: true,
	imports: [TableComponent, ChipsComponent],
	templateUrl: './app.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
