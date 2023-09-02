import { Injectable } from '@angular/core';
import { MarvelHero } from '@domain/MarvelHero.interface';
import { StateService } from '@domain/StateService.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SubjectStateService implements StateService {
	private dataSrc = new BehaviorSubject<MarvelHero[]>([]);
	public data$: Observable<MarvelHero[]> = this.dataSrc.asObservable();

	public setData(data: MarvelHero[]): void {
		this.dataSrc.next(data);
	}
}
