import { Injectable } from '@angular/core';
import { ChartData } from '@shared/domain/ChartData.interface';
import { ChartsDataService } from '@heroes/domain/ChartsDataService';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class RxJsChartsDataService implements ChartsDataService {
	private chartsDataSrc: BehaviorSubject<ChartData | null> =
		new BehaviorSubject<ChartData | null>(null);
	public chartsData$: Observable<ChartData | null> =
		this.chartsDataSrc.asObservable();

	public setChartsData(data: ChartData): void {
		this.chartsDataSrc.next(data);
	}
}
