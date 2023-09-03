import { HeroCreationDialogService } from '@heroes/domain/HeroCreationDialogService';

export class OpenHeroCreation {
	constructor(private readonly dialogService: HeroCreationDialogService) {}
	public run(): void {
		this.dialogService.open();
	}
}
