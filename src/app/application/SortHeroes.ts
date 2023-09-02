import { MarvelHero } from '@domain/MarvelHero.interface';
import { StateService } from '@domain/StateService';
import { SortOptions } from '@domain/SortOptions.interface';

export class SortHeroes {
	private heroes: MarvelHero[] = [];
	private sortOptions: SortOptions | null = null;
	constructor(private readonly stateService: StateService) {
		this.stateService.heroes$.subscribe((heroes: MarvelHero[]) => {
			this.heroes = heroes;
		});
		this.stateService.sortOptions$.subscribe((options: SortOptions | null) => {
			this.sortOptions = options;
		});
	}
	public run(options?: SortOptions, heroes?: MarvelHero[]): void {
		const heroesToSort: MarvelHero[] = heroes ?? this.heroes;
		const sortOptions: SortOptions | null = options ?? this.sortOptions;
		let sortedHeroes: MarvelHero[] = heroesToSort;
		if (sortOptions) {
			if (sortOptions.direction === 'asc') {
				sortedHeroes = this.sortAscending(heroesToSort, sortOptions.property);
			} else if (sortOptions.direction === 'desc') {
				sortedHeroes = this.sortDescending(heroesToSort, sortOptions.property);
			}
			this.stateService.setSortOptions(sortOptions);
		}
		this.stateService.updateHeroes(sortedHeroes);
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
