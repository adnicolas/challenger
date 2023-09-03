import { ChartData } from '@shared/domain/ChartData.interface';
import { ChartDataValue } from '@shared/domain/ChartDataValue.interface';
import { ChartsDataService } from '@heroes/domain/ChartsDataService';
import { HeroesStateService } from '@heroes/domain/HeroesStateService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';

export class SetTableChartsData {
	constructor(
		private readonly stateService: HeroesStateService,
		private readonly chartsDataService: ChartsDataService,
	) {
		this.stateService.filteredHeroes$.subscribe((heroes: MarvelHero[]) => {
			this.run(heroes);
		});
	}
	public async run(heroes: MarvelHero[]): Promise<void> {
		const chartsData: ChartData = this.getTableColumnsNamesFromHeroes(heroes);
		this.chartsDataService.setChartsData(chartsData);
	}
	private getTableColumnsNamesFromHeroes(heroes: MarvelHero[]): ChartData {
		let chartData: ChartData = {};
		Object.keys(heroes[0]).forEach((name: string) => {
			const chartDataValues: ChartDataValue[] = [];
			const groupedData = this.groupBy(heroes, name);
			for (const [key, value] of Object.entries(groupedData)) {
				chartDataValues.push({
					name: key,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					value: (value as any[]).length
				});
			}
			chartData = {
				...chartData,
				[name]: chartDataValues
			};
			return chartData;
		});
		return chartData;
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
