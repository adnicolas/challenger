export abstract class TableService {
	public abstract tableColumnsNames$: unknown;
	public abstract setTableColumnsNames(columns: string[]): void;
}
