import { HeroesStateService } from '@heroes/domain/HeroesStateService';

export class ResetFilter {
	constructor(private readonly stateService: HeroesStateService) {}
	public run(): void {
		this.stateService.resetFilter();
	}
}
