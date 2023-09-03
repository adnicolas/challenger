import { Observable } from 'rxjs';

export abstract class TableService {
	public abstract tableColumnsNames$: Observable<string[]>;
	public abstract setTableColumnsNames(columns: string[]): void;
}
