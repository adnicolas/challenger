import { MarvelHero } from './MarvelHero.interface';

export abstract class DataService {
	public abstract getData(): Promise<MarvelHero[]>;
}
