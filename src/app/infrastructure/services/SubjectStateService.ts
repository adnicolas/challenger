import { Injectable } from '@angular/core';
import { MarvelHero } from '@domain/MarvelHero.interface';
import { StateService } from '@domain/StateService.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SubjectStateService implements StateService {
	private heroesSrc = new BehaviorSubject<MarvelHero[]>([]);
	public data$: Observable<MarvelHero[]> = this.heroesSrc.asObservable();

	private heroesNamesSrc = new BehaviorSubject<string[]>([]);
	public heroesNames$: Observable<string[]> =
		this.heroesNamesSrc.asObservable();

	public setData(data: MarvelHero[]): void {
		this.heroesSrc.next(data);
		this.heroesNamesSrc.next(data.map((hero: MarvelHero) => hero.nameLabel));
	}
}
