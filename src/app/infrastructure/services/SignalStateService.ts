import { Injectable, signal } from '@angular/core';
import { MarvelData } from '@domain/MarvelData.interface';
import { StateService } from '@domain/StateService.interface';

@Injectable({
	providedIn: 'root'
})
export class SignalStateService implements StateService {
	private data = signal<MarvelData[]>([]);
	public data$ = this.data.asReadonly();

	public setData(data: MarvelData[]): void {
		this.data.update(() => [...data]);
	}
}
