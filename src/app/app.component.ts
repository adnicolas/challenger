import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './infrastructure/components/table/table.component';

@Component({
	selector: 'challenger-root',
	standalone: true,
	imports: [CommonModule, TableComponent],
	templateUrl: './app.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
