import { ChartData } from '@shared/domain/ChartData.interface';

export abstract class ChartsDataService {
	public abstract chartsData$: unknown;
	public abstract setChartsData(data: ChartData): void;
}
