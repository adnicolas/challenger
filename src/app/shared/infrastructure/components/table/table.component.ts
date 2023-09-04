import { CommonModule } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	Signal,
	ViewChild
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ChartData } from '@shared/domain/ChartData.interface';
import { SortOptions } from '@shared/domain/SortOptions.interface';
import { BarChartComponent } from '@shared/infrastructure/components/bar-chart/bar-chart.component';
import { PieChartComponent } from '@shared/infrastructure/components/pie-chart/pie-chart.component';
import { FormatColumnName } from '@shared/infrastructure/pipes/formatColumnName.pipe';
import { Observable, Subscription, of } from 'rxjs';

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
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
	@Input() data$: Observable<unknown[]> = of([]);
	@Input() displayedColumns$!: Signal<string[]>;
	@Input() chartsData$!: Signal<ChartData[]>;
	@Input() chartsThreshold!: number;
	@Input() hidePaginator: boolean = false;
	@Output() sorted: EventEmitter<SortOptions> = new EventEmitter<SortOptions>();
	@Output() rowSelected: EventEmitter<unknown> = new EventEmitter<unknown>();

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	public dataSource = new MatTableDataSource();
	private subscription!: Subscription;

	ngOnInit(): void {
		this.subscription = this.data$.subscribe((data) => {
			this.dataSource.data = data;
		});
	}

	ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
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

	public getChartColumnsDefs(displayedColumns: string[]): string[] {
		return displayedColumns.map((column: string) => `${column}-chart`);
	}
}
