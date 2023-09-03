import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { TableService } from '@heroes/domain/TableService';

export class SetTableColumnsNames {
	constructor(private readonly tableService: TableService) {}
	public async run(heroes: MarvelHero[]): Promise<void> {
		const tableColumnsNames: string[] =
			this.getTableColumnsNamesFromHeroes(heroes);
		this.tableService.setTableColumnsNames(tableColumnsNames);
	}
	private getTableColumnsNamesFromHeroes(heroes: MarvelHero[]): string[] {
		return Object.keys(heroes[0]).map((key) => key);
	}
}
