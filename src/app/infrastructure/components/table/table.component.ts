import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MarvelData } from '../../../domain/MarvelData.interface';
import { MarvelService } from '../../../domain/MarvelService';
import { LocalMarvelService } from '../../services/LocalMarvelService';

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
	public dataSource = new MatTableDataSource<MarvelData>();
	public displayedColumns: string[] = [];
	constructor(private marvelService: MarvelService) {}
	ngOnInit() {
		const data: MarvelData[] = this.marvelService.getData();
		this.displayedColumns = Object.keys(data[0]);
		this.dataSource = new MatTableDataSource(data);
	}
	public getHeader(property: string): string {
		if (property.includes('Label')) {
			return `${property[0].toUpperCase()}${property.slice(
				headerCapitalizeSlice,
			)}`.replace('Label', '');
		}
		return property;
	}
}
