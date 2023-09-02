import { MarvelData } from '@domain/MarvelData.interface';

export abstract class MarvelService {
	public abstract getData(): Promise<MarvelData[]>;
}
