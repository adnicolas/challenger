import { ChipsService } from '@heroes/domain/ChipsService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';

export class AddChipOption {
	constructor(private readonly chipsService: ChipsService) {}
	public async run(hero: MarvelHero): Promise<void> {
		this.chipsService.addOption(hero.nameLabel);
	}
}
