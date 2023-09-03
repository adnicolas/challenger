import { ChartData } from '@shared/domain/ChartData.interface';
import { Observable } from 'rxjs';

export abstract class ChartsDataService {
	public abstract chartsData$: Observable<ChartData | null>;
	public abstract setChartsData(data: ChartData): void;
}
