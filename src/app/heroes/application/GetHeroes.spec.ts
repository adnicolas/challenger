import { HeroesDataService } from '../domain/HeroesDataService';
import { GetHeroes } from './GetHeroes';
import { MarvelHero } from '../domain/MarvelHero.interface';
import { Gender } from '../domain/Gender.enum';

const heroesMock: MarvelHero[] = [
	{
		nameLabel: 'Ahab',
		genderLabel: Gender.MALE,
		citizenshipLabel: 'United States of America',
		skillsLabel: 'superhuman strength',
		occupationLabel: 'psychologist',
		memberOfLabel: 'Horsemen of Apocalypse',
		creatorLabel: 'Walt Simonson'
	},
	{
		nameLabel: 'Anya Corazon',
		genderLabel: Gender.FEMALE,
		citizenshipLabel: 'United States of America',
		skillsLabel: 'superhuman strength',
		occupationLabel: 'student',
		memberOfLabel: 'The Spider Society',
		creatorLabel: 'Fiona Avery'
	}
];

describe('GetHeroes', () => {
	const repositoryMock: jest.Mocked<HeroesDataService> = {
		getHeroes: jest.fn().mockReturnValue(heroesMock)
	};
	const getHeroes: GetHeroes = new GetHeroes(repositoryMock);

	it('should find heroes', async () => {
		const heroes: MarvelHero[] = await getHeroes.run();
		expect(repositoryMock.getHeroes).toHaveBeenCalledWith();
		// eslint-disable-next-line no-magic-numbers
		expect(heroes).toHaveLength(2);
		expect(heroes).toStrictEqual(heroesMock);
	});
});
