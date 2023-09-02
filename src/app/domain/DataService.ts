import { MarvelHero } from './MarvelHero.interface';

export abstract class DataService {
	public abstract getHeroes(): Promise<MarvelHero[]>;
}
