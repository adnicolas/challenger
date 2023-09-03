import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { HeroesStateService } from '@heroes/domain/HeroesStateService';
import { SortOptions } from '@shared/domain/SortOptions.interface';

export class SortHeroes {
	private heroes: MarvelHero[] = [];
	private sortOptions: SortOptions | null = null;
	constructor(private readonly stateService: HeroesStateService) {
		this.stateService.filteredHeroes$.subscribe((heroes: MarvelHero[]) => {
			this.heroes = heroes;
		});
	}
	public run(options?: SortOptions): void {
		const sortOptions: SortOptions | null = options ?? this.sortOptions;
		let sortedHeroes: MarvelHero[] = this.heroes;
		if (sortOptions) {
			if (sortOptions.direction === 'asc') {
				sortedHeroes = this.sortAscending(sortedHeroes, sortOptions.property);
			} else if (sortOptions.direction === 'desc') {
				sortedHeroes = this.sortDescending(sortedHeroes, sortOptions.property);
			}
			this.sortOptions = sortOptions;
		}
		this.stateService.updateFilteredHeroes(sortedHeroes);
	}

	private sortAscending(heroes: MarvelHero[], property: string): MarvelHero[] {
		// eslint-disable-next-line max-len
		return heroes.sort((a: MarvelHero, b: MarvelHero) =>
			a[property as keyof MarvelHero].localeCompare(
				b[property as keyof MarvelHero],
			),
		);
	}
	private sortDescending(heroes: MarvelHero[], property: string): MarvelHero[] {
		// eslint-disable-next-line max-len
		return heroes.sort((a: MarvelHero, b: MarvelHero) =>
			b[property as keyof MarvelHero].localeCompare(
				a[property as keyof MarvelHero],
			),
		);
	}
}
