import { Gender } from '@heroes/domain/Gender.enum';

export interface MarvelHero {
	nameLabel: string;
	genderLabel: Gender;
	citizenshipLabel: string;
	skillsLabel: string;
	occupationLabel: string;
	memberOfLabel: string;
	creatorLabel: string;
}
