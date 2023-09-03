import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GetHeroes } from '@heroes/application/GetHeroes';
import { HeroesDataService } from '@heroes/domain/HeroesDataService';
import { ChipsComponent } from '@shared/infrastructure/components/chips/chips.component';
import { TableComponent } from '@shared/infrastructure/components/table/table.component';
import { LocalHeroesDataService } from '@heroes/infrastructure/services/LocalHeroesDataService';
import { RxJsHeroesStateService } from '@heroes/infrastructure/services/RxJsHeroesStateService';
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
import { FilterHeroes } from '@heroes/application/FilterHeroes';
import { ResetFilter } from '@heroes/application/ResetFilter';
import { CommonModule } from '@angular/common';
import { TableColumn } from '@shared/domain/TableColumn.interface';
import { HeroesStateService } from '@heroes/domain/HeroesStateService';
import { TableService } from '@heroes/domain/TableService';
import { RxJsTableService } from '@heroes/infrastructure/services/RxJsTableService';
import { ChipsService } from '@heroes/domain/ChipsService';
import { RxJsChipsService } from '@heroes/infrastructure/services/RxJsChipsService';

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
	public tableColumns$: Observable<TableColumn[]> =
		this.tableService.tableColumns$;
	public chipOptions$: Observable<string[]> = this.chipsService.options$;
	// eslint-disable-next-line max-params
	constructor(
		private dataService: HeroesDataService,
		private stateService: HeroesStateService,
		private tableService: TableService,
		private chipsService: ChipsService,
		private heroCreationDialogService: HeroCreationDialogService,
		private heroDetailDialogService: HeroDetailDialogService,
	) {}
	async ngOnInit(): Promise<void> {
		await new GetHeroes(
			this.dataService,
			this.stateService,
			this.tableService,
			this.chipsService,
		).run();
	}
	public onCreateHero(): void {
		new OpenHeroCreation(this.heroCreationDialogService).run();
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
