import { HeroesStateService } from '@heroes/domain/HeroesStateService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';

export class CreateHero {
	constructor(private readonly stateService: HeroesStateService) {}
	public run(hero: MarvelHero): void {
		this.stateService.addHero(hero);
	}
}
