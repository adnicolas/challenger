import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MarvelData } from '@domain/MarvelData.interface';
import { MarvelService } from '@domain/MarvelService';
import { LocalMarvelService } from '@infrastructure/services/LocalMarvelService';
import { BehaviorSubject } from 'rxjs';

const headerCapitalizeSlice = 1;

@Component({
	selector: 'challenger-table',
	standalone: true,
	imports: [CommonModule, MatTableModule],
	templateUrl: './table.component.html',
	styles: [],
	providers: [{ provide: MarvelService, useClass: LocalMarvelService }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private dataSrc = new BehaviorSubject<any>([]);
	public dataSource$ = this.dataSrc.asObservable();
	private displayedColumnsSrc = new BehaviorSubject<string[]>([]);
	public displayedColumns$ = this.displayedColumnsSrc.asObservable();

	constructor(private marvelService: MarvelService) {}

	ngOnInit() {
		this.getTableData();
	}
	public getHeader(property: string): string {
		if (property.includes('Label')) {
			return `${property[0].toUpperCase()}${property.slice(
				headerCapitalizeSlice,
			)}`.replace('Label', '');
		}
		return property;
	}
	private async getTableData(): Promise<void> {
		const data: MarvelData[] = await this.marvelService.getData();
		this.displayedColumnsSrc.next(Object.keys(data[0]));
		this.dataSrc.next(new MatTableDataSource(data));
	}
}
