import { HeroDetailDialogService } from '@heroes/domain/HeroDetailDialogService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';

export class OpenHeroDetail {
	constructor(private readonly dialogService: HeroDetailDialogService) {}
	public run(hero: MarvelHero): void {
		this.dialogService.open(hero);
	}
}
