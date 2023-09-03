import { HeroesDataService } from '@heroes/domain/HeroesDataService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';

export class GetHeroes {
	constructor(private readonly dataService: HeroesDataService) {}
	public async run(): Promise<MarvelHero[]> {
		const heroes: MarvelHero[] = await this.dataService.getHeroes();
		return heroes;
	}
}
