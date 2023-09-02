import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'challenger-button',
	standalone: true,
	imports: [MatButtonModule],
	templateUrl: './button.component.html',
	styles: []
})
export class ButtonComponent {
	@Input() text!: string;
	@Output() private clicked: EventEmitter<void> = new EventEmitter();
	public onClick() {
		this.clicked.emit();
	}
}
