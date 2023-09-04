import { ChipsService } from '@heroes/domain/ChipsService';
import { HeroesStateService } from '@heroes/domain/HeroesStateService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { Observable } from 'rxjs';

export class SetChipsOptions {
	constructor(
		private readonly chipsService: ChipsService,
		private readonly stateService: HeroesStateService,
	) {
		(this.stateService.filteredHeroes$ as Observable<MarvelHero[]>).subscribe(
			(heroes: MarvelHero[]) => {
				this.run(heroes);
			},
		);
	}
	public async run(heroes: MarvelHero[]): Promise<void> {
		const options: string[] = heroes.map((hero: MarvelHero) => hero.nameLabel);
		this.chipsService.setOptions(options);
	}
}
