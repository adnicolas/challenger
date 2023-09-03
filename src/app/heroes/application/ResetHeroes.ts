import { HeroesStateService } from '@heroes/domain/HeroesStateService';

export class ResetHeroes {
	constructor(private readonly stateService: HeroesStateService) {}
	public run(): void {
		this.stateService.resetHeroes();
	}
}
