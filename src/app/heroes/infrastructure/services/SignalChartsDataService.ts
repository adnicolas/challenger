import { Injectable, WritableSignal, Signal, signal } from '@angular/core';
import { ChartsDataService } from '@heroes/domain/ChartsDataService';
import { ChartData } from '@shared/domain/ChartData.interface';

@Injectable()
export class SignalChartsDataService implements ChartsDataService {
	private chartsDataSrc: WritableSignal<ChartData | null> = signal(null);
	public chartsData$: Signal<ChartData | null> =
		this.chartsDataSrc.asReadonly();

	public setChartsData(data: ChartData): void {
		this.chartsDataSrc.set(data);
	}
}
