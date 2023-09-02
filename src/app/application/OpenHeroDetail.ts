import { HeroDetailDialogService } from '@domain/HeroDetailDialogService';
import { MarvelHero } from '@domain/MarvelHero.interface';

export class OpenHeroDetail {
	constructor(private readonly dialogService: HeroDetailDialogService) {}
	public run(hero: MarvelHero): void {
		this.dialogService.open(hero);
	}
}
