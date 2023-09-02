import { DomainHeroService } from '@domain/DomainHeroService';
import { MarvelHero } from '@domain/MarvelHero.interface';
import { StateService } from '@domain/StateService';

export class FilterHeroes {
	private heroes: MarvelHero[] = [];
	constructor(
		private readonly stateService: StateService,
		private readonly domainHeroService: DomainHeroService,
	) {
		this.stateService.heroes$.subscribe((heroes: MarvelHero[]) => {
			this.heroes = heroes;
		});
	}
	public run(filteredHeroesNames: string[]): void {
		// eslint-disable-next-line arrow-body-style
		const filteredHeroes: MarvelHero[] = this.heroes.filter(
			(hero: MarvelHero) =>
				filteredHeroesNames.includes(this.domainHeroService.getHeroName(hero)),
		);
		this.stateService.updateHeroes(filteredHeroes);
	}
}
