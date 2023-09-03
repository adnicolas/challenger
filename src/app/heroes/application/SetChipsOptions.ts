import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { ChipsService } from '@heroes/domain/ChipsService';
import { DomainHeroService } from '@heroes/domain/DomainHeroService';

export class SetChipsOptions {
	constructor(
		private readonly chipsService: ChipsService,
		private readonly domainHeroService: DomainHeroService,
	) {}
	public async run(heroes: MarvelHero[]): Promise<void> {
		const options: string[] = heroes.map((hero: MarvelHero) =>
			this.domainHeroService.getHeroName(hero),
		);
		this.chipsService.setOptions(options);
	}
}
