import { DataService } from '@domain/DataService';
import { MarvelHero } from '@domain/MarvelHero.interface';
import { StateService } from '@domain/StateService';

export class GetHeroes {
	constructor(
		private readonly dataService: DataService,
		private readonly stateService: StateService,
	) {}
	public async run(): Promise<void> {
		const heroes: MarvelHero[] = await this.dataService.getHeroes();
		this.stateService.setHeroes(heroes);
	}
}
