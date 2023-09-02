import { MarvelHero } from '@domain/MarvelHero.interface';
import { StateService } from '@domain/StateService.interface';
import { SortDirection } from '@angular/material/sort';

export class SortData {
	constructor(private readonly stateService: StateService) {}
	public run(
		heroes: MarvelHero[],
		active: string,
		direction: SortDirection,
	): void {
		let sortedHeroes: MarvelHero[] = heroes;
		if (direction === 'asc') {
			sortedHeroes = this.sortAscending(heroes, active);
		} else if (direction === 'desc') {
			sortedHeroes = this.sortDescending(heroes, active);
		}
		this.stateService.setData(sortedHeroes);
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
