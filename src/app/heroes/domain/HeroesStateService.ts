import { Observable } from 'rxjs';
import { MarvelHero } from './MarvelHero.interface';

export abstract class HeroesStateService {
	public abstract filteredHeroes$: Observable<MarvelHero[]>;
	public abstract filterHeroes(heroesNames: string[]): void;
	public abstract updateFilteredHeroes(heroes: MarvelHero[]): void;
	public abstract setHeroes(heroes: MarvelHero[]): void;
	public abstract resetFilter(): void;
	public abstract addHero(hero: MarvelHero): void;
}
