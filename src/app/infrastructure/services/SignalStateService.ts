import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MarvelData } from '@domain/MarvelData.interface';
import { StateService } from '@domain/StateService.interface';

@Injectable({
	providedIn: 'root'
})
export class SignalStateService implements StateService {
	private dataSrc = signal<MarvelData[]>([]);
	public data$ = toObservable(this.dataSrc);

	public setData(data: MarvelData[]): void {
		this.dataSrc.update(() => [...data]);
	}
}
