import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	inject
} from '@angular/core';
import { GetHeroes } from '@application/GetHeroes';
import { DataService } from '@domain/DataService';
import { ChipsComponent } from '@infrastructure/components/chips/chips.component';
import { TableComponent } from '@infrastructure/components/table/table.component';
import { LocalDataService } from '@infrastructure/services/LocalDataService';
import { SubjectStateService } from '@infrastructure/services/SubjectStateService';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '@infrastructure/components/button/button.component';

@Component({
	selector: 'challenger-root',
	standalone: true,
	imports: [
		TableComponent,
		ChipsComponent,
		ButtonComponent,
		MatDialogModule
	],
	templateUrl: './app.component.html',
	providers: [{ provide: DataService, useClass: LocalDataService }],
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
	private stateService = inject(SubjectStateService);
	constructor(private dataService: DataService) {}
	async ngOnInit(): Promise<void> {
		await new GetHeroes(this.dataService, this.stateService).run();
	}
	public onCreateHero(): void {
		//console.log('on create hero clicked');
	}
}
