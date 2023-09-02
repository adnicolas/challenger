import { Injectable } from '@angular/core';
import { MarvelHero } from '@domain/MarvelHero.interface';
import { DataService } from '@domain/DataService';

@Injectable()
export class LocalDataService implements DataService {
	public getData(): Promise<MarvelHero[]> {
		return fetch('assets/data/wikipedia_marvel_data.json')
			.then((res) => res.json())
			.then((data) => data);
	}
}
