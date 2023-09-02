import { Gender } from '@domain/Gender.enum';

export interface MarvelData {
	nameLabel: string;
	genderLabel: Gender;
	citizenshipLabel: string;
	skillsLabel: string;
	occupationLabel: string;
	memberOfLabel: string;
	creatorLabel: string;
}
