import { Observable } from 'rxjs';
import { MarvelHero } from './MarvelHero.interface';

export abstract class ChipsService {
	public abstract options$: Observable<string[]>;
	public abstract setOptions(heroes: MarvelHero[]): void;
}
