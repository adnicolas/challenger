import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'challenger-table',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './table.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {}
