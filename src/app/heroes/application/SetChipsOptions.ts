import { ChipsService } from '@heroes/domain/ChipsService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';

export class SetChipsOptions {
	constructor(private readonly chipsService: ChipsService) {}
	public async run(heroes: MarvelHero[]): Promise<void> {
		const options: string[] = heroes.map((hero: MarvelHero) => hero.nameLabel);
		this.chipsService.setOptions(options);
	}
}
