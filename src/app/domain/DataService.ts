import { MarvelData } from './MarvelData.interface';

export abstract class DataService {
	public abstract getData(): Promise<MarvelData[]>;
}
