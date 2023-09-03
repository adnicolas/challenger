import { HeroCreationDialogService } from '@heroes/domain/HeroCreationDialogService';
import { HeroesStateService } from '@heroes/domain/HeroesStateService';

export class OpenHeroCreation {
	constructor(
		private readonly dialogService: HeroCreationDialogService,
		private readonly stateService: HeroesStateService,
	) {}
	public run(): void {
		this.dialogService.open(this.stateService);
	}
}
