import { MarvelData } from '@domain/MarvelData.interface';

export abstract class MarvelService {
	abstract getData(): Promise<MarvelData[]>;
}
