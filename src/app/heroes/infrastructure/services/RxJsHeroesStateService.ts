import { Injectable } from '@angular/core';
import { AddChipOption } from '@heroes/application/AddChipOption';
import { HeroesStateService } from '@heroes/domain/HeroesStateService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChipsService } from '@heroes/domain/ChipsService';

@Injectable()
export class RxJsHeroesStateService implements HeroesStateService {
	private heroes: MarvelHero[] = [];
	private filteredHeroesSrc = new BehaviorSubject<MarvelHero[]>([]);
	public filteredHeroes$: Observable<MarvelHero[]> =
		this.filteredHeroesSrc.asObservable();

	constructor(private chipsService: ChipsService) {}

	public setHeroes(heroes: MarvelHero[]): void {
		this.heroes = heroes;
		this.filteredHeroesSrc.next(heroes);
	}

	public filterHeroes(heroesNames: string[]): void {
		const filteredHeroes: MarvelHero[] = this.heroes.filter(
			(hero: MarvelHero) => heroesNames.includes(hero.nameLabel),
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
		new AddChipOption(this.chipsService).run(hero);
	}
}
