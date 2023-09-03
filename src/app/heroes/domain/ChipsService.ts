import { Observable } from 'rxjs';

export abstract class ChipsService {
	public abstract options$: Observable<string[]>;
	public abstract setOptions(options: string[]): void;
}
