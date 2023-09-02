import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MarvelHero } from '@domain/MarvelHero.interface';
import { StateService } from '@domain/StateService.interface';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SignalStateService implements StateService {
	private dataSrc = signal<MarvelHero[]>([]);
	public data$: Observable<MarvelHero[]> = toObservable(this.dataSrc);

	public setData(data: MarvelHero[]): void {
		this.dataSrc.update(() => [...data]);
	}
}
