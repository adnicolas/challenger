import { MarvelHero } from './MarvelHero.interface';

export abstract class HeroDetailDialogService {
	public abstract open(hero: MarvelHero): void;
}
