import { Injectable } from '@angular/core';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { HeroesStateService } from '@heroes/domain/HeroesStateService';
import { BehaviorSubject, Observable } from 'rxjs';
import { DomainHeroService } from '@heroes/domain/DomainHeroService';

@Injectable()
export class RxJsHeroesStateService implements HeroesStateService {
	private heroes: MarvelHero[] = [];
	private filteredHeroesSrc = new BehaviorSubject<MarvelHero[]>([]);
	public filteredHeroes$: Observable<MarvelHero[]> =
		this.filteredHeroesSrc.asObservable();

	constructor(private domainHeroService: DomainHeroService) {}

	public setHeroes(heroes: MarvelHero[]): void {
		this.heroes = heroes;
		this.filteredHeroesSrc.next(heroes);
	}

	public filterHeroes(heroesNames: string[]): void {
		const filteredHeroes: MarvelHero[] = this.heroes.filter(
			(hero: MarvelHero) =>
				heroesNames.includes(this.domainHeroService.getHeroName(hero)),
		);
		this.filteredHeroesSrc.next(filteredHeroes);
	}

	public updateFilteredHeroes(heroes: MarvelHero[]): void {
		this.filteredHeroesSrc.next(heroes);
	}

	public resetFilter(): void {
		this.filteredHeroesSrc.next(this.heroes);
	}

	public addHero(hero: MarvelHero): void {
		const heroes: MarvelHero[] = this.filteredHeroesSrc.getValue();
		heroes.unshift(hero);
		this.filteredHeroesSrc.next(heroes);
	}
}