import { Injectable } from '@angular/core';
import { HeroesDataService } from '@heroes/domain/HeroesDataService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';

@Injectable()
export class LocalHeroesDataService implements HeroesDataService {
	public getHeroes(): Promise<MarvelHero[]> {
		return fetch('assets/data/wikipedia_marvel_data.json')
			.then((res) => res.json())
			.then((data) => data);
	}
}
