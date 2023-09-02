import { DataService } from '@domain/DataService';
import { MarvelHero } from '@domain/MarvelHero.interface';
import { StateService } from '@domain/StateService.interface';

export class GetData {
	constructor(
		private readonly dataService: DataService,
		private readonly stateService: StateService,
	) {}
	public async run(): Promise<void> {
		const data: MarvelHero[] = await this.dataService.getData();
		this.stateService.setData(data);
	}
}
