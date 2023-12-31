export abstract class ChipsService {
	public abstract options$: unknown;
	public abstract setOptions(options: string[]): void;
	public abstract addOption(option: string): void;
}
