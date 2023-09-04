import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { GetHeroes } from '@heroes/application/GetHeroes';
import { OpenHeroCreation } from '@heroes/application/OpenHeroCreation';
import { HeroCreationDialogService } from '@heroes/domain/HeroCreationDialogService';
import { HeroesDataService } from '@heroes/domain/HeroesDataService';
import { LocalHeroesDataService } from '@heroes/infrastructure/services/LocalHeroesDataService';
import { RxJsHeroesStateService } from '@heroes/infrastructure/services/RxJsHeroesStateService';
import { ButtonComponent } from '@shared/infrastructure/components/button/button.component';
import { ChipsComponent } from '@shared/infrastructure/components/chips/chips.component';
import { TableComponent } from '@shared/infrastructure/components/table/table.component';
import { HeroDetailDialogService } from '@heroes/domain/HeroDetailDialogService';
// eslint-disable-next-line max-len
import { AngularMaterialHeroCreationDialogService } from '@heroes/infrastructure/services/AngularMaterialHeroCreationDialogService';
import { CommonModule } from '@angular/common';
import { FilterHeroes } from '@heroes/application/FilterHeroes';
import { OpenHeroDetail } from '@heroes/application/OpenHeroDetail';
import { ResetFilter } from '@heroes/application/ResetFilter';
import { SetChipsOptions } from '@heroes/application/SetChipsOptions';
import { SetHeroes } from '@heroes/application/SetHeroes';
import { SetTableChartsData } from '@heroes/application/SetTableChartsData';
import { SetTableColumnsNames } from '@heroes/application/SetTableColumnsNames';
import { SortHeroes } from '@heroes/application/SortHeroes';
import { ChartsDataService } from '@heroes/domain/ChartsDataService';
import { chartsThreshold } from '@heroes/domain/ChartsThreshold';
import { ChipsService } from '@heroes/domain/ChipsService';
import { DomainHeroService } from '@heroes/domain/DomainHeroService';
import { HeroesStateService } from '@heroes/domain/HeroesStateService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { TableService } from '@heroes/domain/TableService';
// eslint-disable-next-line max-len
import { AngularMaterialHeroDetailDialogService } from '@heroes/infrastructure/services/AngularMaterialHeroDetailDialogService';
import { RxJsChartsDataService } from '@heroes/infrastructure/services/RxJsChartsDataService';
import { RxJsChipsService } from '@heroes/infrastructure/services/RxJsChipsService';
import { RxJsTableService } from '@heroes/infrastructure/services/RxJsTableService';
import { ChartData } from '@shared/domain/ChartData.interface';
import { SortOptions } from '@shared/domain/SortOptions.interface';
import { Observable } from 'rxjs';

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
		{ provide: HeroesStateService, useClass: RxJsHeroesStateService },
		{ provide: TableService, useClass: RxJsTableService },
		{ provide: ChartsDataService, useClass: RxJsChartsDataService },
		{ provide: ChipsService, useClass: RxJsChipsService },
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
	public filteredHeroes$: Observable<MarvelHero[]> =
		this.stateService.filteredHeroes$;
	public tableColumnsNames$: Observable<string[]> =
		this.tableService.tableColumnsNames$;
	public chipOptions$: Observable<string[]> = this.chipsService.options$;
	public chartsData$: Observable<ChartData | null> =
		this.chartsDataService.chartsData$;
	public CHARTS_THRESHOLD = chartsThreshold;
	// eslint-disable-next-line max-params
	constructor(
		private dataService: HeroesDataService,
		private stateService: HeroesStateService,
		private tableService: TableService,
		private chipsService: ChipsService,
		private chartsDataService: ChartsDataService,
		private domainHeroService: DomainHeroService,
		private heroCreationDialogService: HeroCreationDialogService,
		private heroDetailDialogService: HeroDetailDialogService,
	) {}
	async ngOnInit(): Promise<void> {
		const heroes: MarvelHero[] = await new GetHeroes(this.dataService).run();
		new SetHeroes(this.stateService).run(heroes);
		new SetTableColumnsNames(this.tableService).run(heroes);
		new SetTableChartsData(this.stateService, this.chartsDataService).run(
			heroes,
		);
		new SetChipsOptions(
			this.chipsService,
			this.domainHeroService,
			this.stateService,
		).run(heroes);
	}
	public onCreateHero(): void {
		new OpenHeroCreation(
			this.heroCreationDialogService,
			this.stateService,
		).run();
	}
	public onSortHeroes(options: SortOptions): void {
		new SortHeroes(this.stateService).run(options);
	}
	public onSelectHero(hero: unknown): void {
		new OpenHeroDetail(this.heroDetailDialogService).run(hero as MarvelHero);
	}
	public onUpdateChipsSelection(heroesNames: string[]): void {
		new FilterHeroes(this.stateService).run(heroesNames);
	}
	public onResetFilter(): void {
		new ResetFilter(this.stateService).run();
		new SortHeroes(this.stateService).run();
	}
}
