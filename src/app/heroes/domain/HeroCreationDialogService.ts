import { HeroesStateService } from '@heroes/domain/HeroesStateService';

export abstract class HeroCreationDialogService {
	public abstract open(stateService: HeroesStateService): void;
}
