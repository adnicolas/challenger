import { Injectable } from '@angular/core';
import { Gender } from '../../domain/Gender.enum';
import { MarvelData } from '../../domain/MarvelData.interface';
import { MarvelService } from '../../domain/MarvelService';

@Injectable()
export class LocalMarvelService implements MarvelService {
	// eslint-disable-next-line max-lines-per-function
	getData(): MarvelData[] {
		return [
			{
				nameLabel: 'Ultimate Spider-Woman',
				genderLabel: Gender.FEMALE,
				citizenshipLabel: 'United States of America',
				skillsLabel: 'superhuman strength',
				occupationLabel: 'superhero',
				memberOfLabel: 'S.H.I.E.L.D.',
				creatorLabel: 'Mark Bagley'
			},
			{
				nameLabel: 'Vanisher',
				genderLabel: Gender.MALE,
				citizenshipLabel: 'United States of America',
				skillsLabel: 'teleportation in fiction',
				occupationLabel: 'criminal',
				memberOfLabel: 'X-Force',
				creatorLabel: 'Stan Lee'
			},
			{
				nameLabel: 'Wolverine',
				genderLabel: Gender.FEMALE,
				citizenshipLabel: 'Canada',
				skillsLabel: 'healing factor',
				occupationLabel: 'sailor',
				memberOfLabel: 'Canadian Army',
				creatorLabel: 'Len Wein'
			}
		];
	}
}
