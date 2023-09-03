import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { TableService } from '@heroes/domain/TableService';

export class SetTableColumnsNames {
	constructor(private readonly tableService: TableService) {}
	public async run(heroes: MarvelHero[]): Promise<void> {
		const tableColumnsNames: string[] =
			this.getTableColumnsNamesFromHeroes(heroes);
		this.tableService.setTableColumnsNames(tableColumnsNames);
	}
	private getTableColumnsNamesFromHeroes(heroes: MarvelHero[]): string[] {
		return Object.keys(heroes[0]).map((key) => key);
		/*const tableColumns: TableColumn[] = Object.keys(heroes[0]).map(
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
		return tableColumns;*/
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
