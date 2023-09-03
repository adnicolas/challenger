import { HeroesStateService } from '@heroes/domain/HeroesStateService';

export class FilterHeroes {
	constructor(private readonly stateService: HeroesStateService) {}
	public run(filteredHeroesNames: string[]): void {
		this.stateService.filterHeroes(filteredHeroesNames);
	}
}
