import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	inject
} from '@angular/core';
import { GetHeroes } from '@heroes/application/GetHeroes';
import { HeroesDataService } from '@heroes/domain/HeroesDataService';
import { ChipsComponent } from '@shared/infrastructure/components/chips/chips.component';
import { TableComponent } from '@shared/infrastructure/components/table/table.component';
import { LocalHeroesDataService } from '@heroes/infrastructure/services/LocalHeroesDataService';
import { SubjectHeroesStateService } from '@heroes/infrastructure/services/SubjectHeroesStateService';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '@shared/infrastructure/components/button/button.component';
import { OpenHeroCreation } from '@heroes/application/OpenHeroCreation';
import { HeroCreationDialogService } from '@heroes/domain/HeroCreationDialogService';
// eslint-disable-next-line max-len
import { AngularMaterialHeroCreationDialogService } from '@heroes/infrastructure/services/AngularMaterialHeroCreationDialogService';
import { HeroDetailDialogService } from '@heroes/domain/HeroDetailDialogService';
// eslint-disable-next-line max-len
import { AngularMaterialHeroDetailDialogService } from '@heroes/infrastructure/services/AngularMaterialHeroDetailDialogService';
import { Observable } from 'rxjs';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { SortOptions } from '@shared/domain/SortOptions.interface';
import { SortHeroes } from '@heroes/application/SortHeroes';
import { OpenHeroDetail } from '@heroes/application/OpenHeroDetail';
import { DomainHeroService } from '@heroes/domain/DomainHeroService';
import { FilterHeroes } from '@heroes/application/FilterHeroes';
import { ResetHeroes } from '@heroes/application/ResetHeroes';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'challenger-root',
	standalone: true,
	imports: [
		CommonModule,
		TableComponent,
		ChipsComponent,
		ButtonComponent,
		MatDialogModule
	],
	templateUrl: './app.component.html',
	providers: [
		{ provide: HeroesDataService, useClass: LocalHeroesDataService },
		{
			provide: HeroCreationDialogService,
			useClass: AngularMaterialHeroCreationDialogService
		},
		{
			provide: HeroDetailDialogService,
			useClass: AngularMaterialHeroDetailDialogService
		}
	],
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
	private stateService = inject(SubjectHeroesStateService);
	public mutableHeroes$: Observable<MarvelHero[]> =
		this.stateService.mutableHeroes$;
	public displayedColumns: string[] = [];
	public allOptions: string[] = [];
	private heroes: MarvelHero[] = [];
	// eslint-disable-next-line max-params
	constructor(
		private dataService: HeroesDataService,
		private domainHeroService: DomainHeroService,
		private heroCreationDialogService: HeroCreationDialogService,
		private heroDetailDialogService: HeroDetailDialogService,
	) {}
	async ngOnInit(): Promise<void> {
		await new GetHeroes(this.dataService, this.stateService).run();
		this.stateService.heroes$.subscribe((heroes: MarvelHero[]) => {
			if (heroes?.length) {
				this.displayedColumns = Object.keys(heroes[0]);
			}
			const heroesNames: string[] = heroes.map((hero: MarvelHero) =>
				this.domainHeroService.getHeroName(hero),
			);
			this.allOptions = heroesNames;
		});
		this.mutableHeroes$.subscribe((heroes: MarvelHero[]) => {
			this.heroes = heroes;
		});
	}
	public onCreateHero(): void {
		new OpenHeroCreation(this.heroCreationDialogService).run();
	}
	public onSortHeroes(options: SortOptions): void {
		new SortHeroes(this.stateService).run(options, this.heroes);
	}
	public onSelectHero(hero: unknown): void {
		new OpenHeroDetail(this.heroDetailDialogService).run(hero as MarvelHero);
	}
	public onUpdateChipsSelection(heroesNames: string[]): void {
		new FilterHeroes(this.stateService, this.domainHeroService).run(
			heroesNames,
		);
	}
	public onResetChipsSelection(): void {
		new ResetHeroes(this.stateService).run();
		new SortHeroes(this.stateService).run();
	}
}
