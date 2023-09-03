import { HeroesDataService } from '@heroes/domain/HeroesDataService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { HeroesStateService } from '@heroes/domain/HeroesStateService';

export class GetHeroes {
	constructor(
		private readonly dataService: HeroesDataService,
		private readonly stateService: HeroesStateService,
	) {}
	public async run(): Promise<void> {
		const heroes: MarvelHero[] = await this.dataService.getHeroes();
		this.stateService.setHeroes(heroes);
	}
}
