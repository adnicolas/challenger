import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
	ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { Observable, of } from 'rxjs';
import { SortOptions } from '@shared/domain/SortOptions.interface';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { FormatColumnName } from '@shared/infrastructure/pipes/formatColumnName.pipe';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { TableColumn } from '@shared/domain/TableColumn.interface';

@Component({
	selector: 'challenger-table',
	standalone: true,
	imports: [
		CommonModule,
		MatTableModule,
		MatSortModule,
		PieChartComponent,
		BarChartComponent,
		MatPaginatorModule,
		FormatColumnName
	],
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements AfterViewInit {
	@Input() set data$(obs: Observable<unknown[]>) {
		obs.subscribe((data) => {
			this.dataSource.data = data;
		});
	}
	//private _displayedColumns: TableColumn[] = [];
	/*get displayedColumns(): TableColumn[] {
		return this._displayedColumns;
	}*/
	@Input() displayedColumns$: Observable<TableColumn[]> = of([]);
	@Input() hidePaginator: boolean = false;
	@Input() includeHeaderCharts: boolean = true;
	@Output() sorted: EventEmitter<SortOptions> = new EventEmitter<SortOptions>();
	@Output() rowSelected: EventEmitter<unknown> = new EventEmitter<unknown>();

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	public dataSource = new MatTableDataSource();
	//public displayedColumnsNames: string[] = [];

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}
	public sortData(sort: Sort): void {
		this.sorted.emit({
			property: sort.active,
			direction: sort.direction
		});
	}

	public selectRow(row: unknown): void {
		this.rowSelected.emit(row);
	}

	public getChartColumnsDefs(displayedColumns: TableColumn[]): string[] {
		return displayedColumns.map(
			(column: TableColumn) => `${column.name}-chart`,
		);
	}

	public getColumnsNames(displayedColumns: TableColumn[]): string[] {
		return displayedColumns.map((column: TableColumn) => column.name);
	}
}
