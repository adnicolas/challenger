import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonComponent } from '@shared/infrastructure/components/button/button.component';
import { MatInputModule } from '@angular/material/input';
import { CreateHero } from '@heroes/application/CreateHero';
import { MatSelectModule } from '@angular/material/select';
import {
	FormControl,
	Validators,
	FormsModule,
	ReactiveFormsModule,
	FormGroup
} from '@angular/forms';
import { Gender } from '@heroes/domain/Gender.enum';
import { MarvelHero } from '@heroes/domain/MarvelHero.interface';
import { SubjectHeroesStateService } from '@heroes/infrastructure/services/SubjectHeroesStateService';

@Component({
	selector: 'challenger-hero-creation-dialog',
	standalone: true,
	imports: [
		CommonModule,
		MatFormFieldModule,
		ButtonComponent,
		MatInputModule,
		FormsModule,
		MatSelectModule,
		ReactiveFormsModule
	],
	templateUrl: './hero-creation-dialog.component.html',
	styles: []
})
export class HeroCreationDialogComponent {
	private stateService = inject(SubjectHeroesStateService);

	public creationForm = new FormGroup({
		nameLabel: new FormControl('', [Validators.required]),
		citizenshipLabel: new FormControl('', [Validators.required]),
		creatorLabel: new FormControl('', [Validators.required]),
		skillsLabel: new FormControl('', [Validators.required]),
		occupationLabel: new FormControl('', [Validators.required]),
		memberOfLabel: new FormControl('', [Validators.required]),
		genderLabel: new FormControl(Gender.MALE, [Validators.required])
	});

	constructor(public dialogRef: MatDialogRef<unknown>) {}
	public close(): void {
		this.dialogRef.close();
	}
	public save(): void {
		new CreateHero(this.stateService).run(
			this.creationForm.value as MarvelHero,
		);
		this.close();
	}
}