import { HeroesStateService } from '@heroes/domain/HeroesStateService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';

export class SetHeroes {
	constructor(private readonly stateService: HeroesStateService) {}
	public async run(heroes: MarvelHero[]): Promise<void> {
		this.stateService.setHeroes(heroes);
	}
}
