import { MarvelHero } from '@heroes/domain/MarvelHero.interface';

export abstract class HeroesStateService {
	public abstract filteredHeroes$: unknown;
	public abstract filterHeroes(heroesNames: string[]): void;
	public abstract updateFilteredHeroes(heroes: MarvelHero[]): void;
	public abstract setHeroes(heroes: MarvelHero[]): void;
	public abstract resetFilter(): void;
	public abstract addHero(hero: MarvelHero): void;
}
