import { MarvelData } from './MarvelData.interface';

export abstract class MarvelService {
	abstract getData(): Promise<MarvelData[]>;
}
