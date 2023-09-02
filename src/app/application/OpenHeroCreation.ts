import { HeroCreationDialogService } from '@domain/HeroCreationDialogService';

export class OpenHeroCreation {
	constructor(private readonly dialogService: HeroCreationDialogService) {}
	public run(): void {
		this.dialogService.open();
	}
}
