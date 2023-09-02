import { DataService } from '@domain/DataService';
import { MarvelData } from '@domain/MarvelData.interface';
import { StateService } from '@domain/StateService.interface';

export class GetData {
	constructor(
		private readonly dataService: DataService,
		private readonly stateService: StateService,
	) {}
	public async run(): Promise<void> {
		const data: MarvelData[] = await this.dataService.getData();
		this.stateService.setData(data);
	}
}
