import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { SortOptions } from '@shared/domain/SortOptions.interface';

@Component({
	selector: 'challenger-table',
	standalone: true,
	imports: [
		CommonModule,
		MatTableModule,
		MatSortModule
	],
	templateUrl: './table.component.html',
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
	@Input() data$!: Observable<unknown[]>;
	@Input() displayedColumns: string[] = [];
	@Output() sorted: EventEmitter<SortOptions> = new EventEmitter<SortOptions>();
	@Output() rowSelected: EventEmitter<unknown> = new EventEmitter<unknown>();

	public sortData(sort: Sort): void {
		this.sorted.emit({
			property: sort.active,
			direction: sort.direction
		});
	}

	public selectRow(row: unknown): void {
		this.rowSelected.emit(row);
	}
}
