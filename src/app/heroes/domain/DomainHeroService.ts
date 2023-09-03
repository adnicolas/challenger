import { Injectable } from '@angular/core';
import { MarvelHero } from './MarvelHero.interface';

const headerCapitalizeSlice = 1;

@Injectable({
	providedIn: 'root'
})
export class DomainHeroService {
	public getHeroName(hero: MarvelHero): string {
		return hero.nameLabel;
	}
	public getHeader(property: string): string {
		if (property.includes('Label')) {
			return `${property[0].toUpperCase()}${property.slice(
				headerCapitalizeSlice,
			)}`.replace('Label', '');
		}
		return property;
	}
}
