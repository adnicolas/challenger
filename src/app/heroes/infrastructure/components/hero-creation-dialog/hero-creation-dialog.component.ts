import { Component } from '@angular/core';
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
	public creationForm = new FormGroup({
		name: new FormControl('', [Validators.required]),
		citizenship: new FormControl('', [Validators.required]),
		creator: new FormControl('', [Validators.required]),
		skills: new FormControl('', [Validators.required]),
		occupation: new FormControl('', [Validators.required]),
		memberOf: new FormControl('', [Validators.required])
	});

	constructor(public dialogRef: MatDialogRef<unknown>) {}
	public close(): void {
		this.dialogRef.close();
	}
	public save(): void {
		new CreateHero().run();
	}
}
