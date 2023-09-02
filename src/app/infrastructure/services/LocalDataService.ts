import { Injectable } from '@angular/core';
import { MarvelData } from '@domain/MarvelData.interface';
import { DataService } from '@domain/DataService';

@Injectable()
export class LocalDataService implements DataService {
	public getData(): Promise<MarvelData[]> {
		return fetch('assets/data/wikipedia_marvel_data.json')
			.then((res) => res.json())
			.then((data) => data);
	}
}
