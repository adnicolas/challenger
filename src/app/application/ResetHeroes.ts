import { StateService } from '@domain/StateService.interface';

export class ResetHeroes {
	constructor(private readonly stateService: StateService) {}
	public async run(): Promise<void> {
		this.stateService.resetHeroes();
	}
}
