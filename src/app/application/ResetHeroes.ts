import { StateService } from '@domain/StateService';

export class ResetHeroes {
	constructor(private readonly stateService: StateService) {}
	public run(): void {
		this.stateService.resetHeroes();
	}
}
