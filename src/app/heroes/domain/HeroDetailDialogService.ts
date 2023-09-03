import { MarvelHero } from '@heroes/domain/MarvelHero.interface';

export abstract class HeroDetailDialogService {
	public abstract open(hero: MarvelHero): void;
}
