import { DomainHeroService } from '@heroes/domain/DomainHeroService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { HeroesStateService } from '@heroes/domain/HeroesStateService';

export class FilterHeroes {
	private heroes: MarvelHero[] = [];
	constructor(
		private readonly stateService: HeroesStateService,
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
