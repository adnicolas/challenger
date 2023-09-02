import { Injectable } from '@angular/core';
import { MarvelData } from '@domain/MarvelData.interface';
import { MarvelService } from '@domain/MarvelService';

@Injectable()
export class LocalMarvelService implements MarvelService {
	public async getData(): Promise<MarvelData[]> {
		return fetch('assets/data/wikipedia_marvel_data.json')
			.then((res) => res.json())
			.then((data) => data);
	}
}
