import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	Signal
} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterHeroes } from '@heroes/application/FilterHeroes';
import { GetHeroes } from '@heroes/application/GetHeroes';
import { OpenHeroCreation } from '@heroes/application/OpenHeroCreation';
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
import { HeroCreationDialogService } from '@heroes/domain/HeroCreationDialogService';
import { HeroDetailDialogService } from '@heroes/domain/HeroDetailDialogService';
import { HeroesDataService } from '@heroes/domain/HeroesDataService';
import { HeroesStateService } from '@heroes/domain/HeroesStateService';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { TableService } from '@heroes/domain/TableService';
import { LocalHeroesDataService } from '@heroes/infrastructure/services/LocalHeroesDataService';
import { RxJsHeroesStateService } from '@heroes/infrastructure/services/RxJsHeroesStateService';
import { ButtonComponent } from '@shared/infrastructure/components/button/button.component';
import { ChipsComponent } from '@shared/infrastructure/components/chips/chips.component';
import { TableComponent } from '@shared/infrastructure/components/table/table.component';
// eslint-disable-next-line max-len
import { AngularMaterialHeroCreationDialogService } from '@heroes/infrastructure/services/AngularMaterialHeroCreationDialogService';
// eslint-disable-next-line max-len
import { AngularMaterialHeroDetailDialogService } from '@heroes/infrastructure/services/AngularMaterialHeroDetailDialogService';
//import { RxJsChartsDataService } from '@heroes/infrastructure/services/RxJsChartsDataService';
import { RxJsChipsService } from '@heroes/infrastructure/services/RxJsChipsService';
//import { RxJsTableService } from '@heroes/infrastructure/services/RxJsTableService';
import { SignalChartsDataService } from '@heroes/infrastructure/services/SignalChartsDataService';
import { SignalTableService } from '@heroes/infrastructure/services/SignalTableService';
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
		{ provide: TableService, useClass: SignalTableService },
		{ provide: ChartsDataService, useClass: SignalChartsDataService },
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
	public filteredHeroes$: Observable<MarvelHero[]> = this.stateService
		.filteredHeroes$ as Observable<MarvelHero[]>;

	public tableColumnsNames$: Signal<string[]> = this.tableService
		.tableColumnsNames$ as Signal<string[]>;

	public chipOptions$: Observable<string[]> = this.chipsService
		.options$ as Observable<string[]>;

	public chartsData$: Signal<ChartData | null> = this.chartsDataService
		.chartsData$ as Signal<ChartData | null>;

	public CHARTS_THRESHOLD = chartsThreshold;
	// eslint-disable-next-line max-params
	constructor(
		private dataService: HeroesDataService,
		private stateService: HeroesStateService,
		private tableService: TableService,
		private chipsService: ChipsService,
		private chartsDataService: ChartsDataService,
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
		new SetChipsOptions(this.chipsService).run(heroes);
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
