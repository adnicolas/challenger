import { Observable } from 'rxjs';
import { MarvelHero } from './MarvelHero.interface';
import { SortOptions } from '../../shared/domain/SortOptions.interface';

export abstract class HeroesStateService {
	public abstract heroes$: Observable<MarvelHero[]>;
	public abstract mutableHeroes$: Observable<MarvelHero[]>;
	public abstract sortOptions$: Observable<SortOptions | null>;
	public abstract updateHeroes(heroes: MarvelHero[]): void;
	public abstract setHeroes(heroes: MarvelHero[]): void;
	public abstract resetHeroes(): void;
	public abstract setSortOptions(options: SortOptions): void;
}
