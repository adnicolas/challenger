import { MarvelHero } from '@heroes/domain/MarvelHero.interface';

export abstract class HeroesDataService {
	public abstract getHeroes(): Promise<MarvelHero[]>;
}
