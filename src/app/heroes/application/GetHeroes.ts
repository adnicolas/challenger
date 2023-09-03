import { HeroesDataService } from '@heroes/domain/HeroesDataService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { HeroesStateService } from '@heroes/domain/HeroesStateService';
import { TableService } from '@heroes/domain/TableService';
import { ChipsService } from '@heroes/domain/ChipsService';

export class GetHeroes {
	// eslint-disable-next-line max-params
	constructor(
		private readonly dataService: HeroesDataService,
		private readonly stateService: HeroesStateService,
		private readonly tableService: TableService,
		private readonly chipsService: ChipsService,
	) {}
	public async run(): Promise<void> {
		const heroes: MarvelHero[] = await this.dataService.getHeroes();
		this.stateService.setHeroes(heroes);
		this.tableService.setTableColumns(heroes);
		this.chipsService.setOptions(heroes);
	}
}
