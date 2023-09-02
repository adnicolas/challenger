import { Observable } from 'rxjs';
import { MarvelHero } from './MarvelHero.interface';
import { SortOptions } from './SortOptions.interface';

export interface StateService {
	heroes$: Observable<MarvelHero[]>;
	sortOptions$: Observable<SortOptions | null>;
	updateHeroes(heroes: MarvelHero[]): void;
	setHeroes(heroes: MarvelHero[]): void;
	resetHeroes(): void;
	setSortOptions(options: SortOptions): void;
}
