import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { ChipsService } from '@heroes/domain/ChipsService';
import { DomainHeroService } from '@heroes/domain/DomainHeroService';
import { HeroesStateService } from '@heroes/domain/HeroesStateService';

export class SetChipsOptions {
	constructor(
		private readonly chipsService: ChipsService,
		private readonly domainHeroService: DomainHeroService,
		private readonly stateService: HeroesStateService,
	) {
		this.stateService.filteredHeroes$.subscribe((heroes: MarvelHero[]) => {
			this.run(heroes);
		});
	}
	public async run(heroes: MarvelHero[]): Promise<void> {
		const options: string[] = heroes.map((hero: MarvelHero) =>
			this.domainHeroService.getHeroName(hero),
		);
		this.chipsService.setOptions(options);
	}
}
