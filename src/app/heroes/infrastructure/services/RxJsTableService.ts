import { Injectable } from '@angular/core';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { ChartData } from '@shared/domain/ChartData.interface';
import { TableColumn } from '@shared/domain/TableColumn.interface';
import { TableService } from '@heroes/domain/TableService';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class RxJsTableService implements TableService {
	private tableColumnsSrc: BehaviorSubject<TableColumn[]> = new BehaviorSubject<
		TableColumn[]
	>([]);
	public tableColumns$: Observable<TableColumn[]> =
		this.tableColumnsSrc.asObservable();

	public setTableColumns(heroes: MarvelHero[]): void {
		const tableColumns: TableColumn[] = Object.keys(heroes[0]).map(
			(name: string) => {
				const groupedData = this.groupBy(heroes, name);
				const chartData: ChartData[] = [];
				for (const [key, value] of Object.entries(groupedData)) {
					chartData.push({
						name: key,
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						value: (value as any[]).length
					});
				}
				return {
					name,
					chartData
				};
			},
		);
		this.tableColumnsSrc.next(tableColumns);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private groupBy(data: MarvelHero[], key: string): any {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return data.reduce((storage: any, item: MarvelHero) => {
			const group = item[key as keyof MarvelHero];
			storage[group] = storage[group] || [];
			storage[group].push(item);
			return storage;
		}, {});
	}
}
