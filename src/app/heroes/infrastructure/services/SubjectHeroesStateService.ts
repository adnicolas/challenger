import { Injectable } from '@angular/core';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { HeroesStateService } from '@heroes/domain/HeroesStateService';
import { BehaviorSubject, Observable } from 'rxjs';
import { SortOptions } from '@shared/domain/SortOptions.interface';

@Injectable({
	providedIn: 'root'
})
export class SubjectHeroesStateService implements HeroesStateService {
	private heroesSrc = new BehaviorSubject<MarvelHero[]>([]);
	private mutableHeroesSrc = new BehaviorSubject<MarvelHero[]>([]);
	private sortOptionsSrc = new BehaviorSubject<SortOptions | null>(null);
	public heroes$: Observable<MarvelHero[]> = this.heroesSrc.asObservable();
	public mutableHeroes$: Observable<MarvelHero[]> =
		this.mutableHeroesSrc.asObservable();
	public sortOptions$: Observable<SortOptions | null> =
		this.sortOptionsSrc.asObservable();

	public setHeroes(heroes: MarvelHero[]): void {
		this.heroesSrc.next(heroes);
		this.mutableHeroesSrc.next(heroes);
	}

	public updateHeroes(heroes: MarvelHero[]): void {
		this.mutableHeroesSrc.next(heroes);
	}

	public resetHeroes(): void {
		const heroes: MarvelHero[] = this.heroesSrc.getValue();
		this.mutableHeroesSrc.next(heroes);
	}

	public setSortOptions(options: SortOptions): void {
		this.sortOptionsSrc.next(options);
	}

	public addHero(hero: MarvelHero): void {
		const heroes: MarvelHero[] = this.mutableHeroesSrc.getValue();
		heroes.unshift(hero);
		this.mutableHeroesSrc.next(heroes);
	}
}
